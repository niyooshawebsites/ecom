import Order from "../models/order.model.js";
import response from "../utils/response.js";
import { createShippingOrder } from "../utils/shipping.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Get shipping rates
const fetchCheapestCourierController = async (orderDetails) => {
  try {
    let authToken = null;

    // Authenticate and fetch token
    const authenticate = async () => {
      try {
        const response = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/auth/login",
          {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
          }
        );
        authToken = response.data.token;
      } catch (err) {
        console.error("Shiprocket authentication failed:", err);
        throw err.message;
      }
    };

    // Ensure valid authentication token
    const ensureAuth = async () => {
      if (!authToken) await authenticate();
    };

    ensureAuth();

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
      orderDetails,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    const couriers = response.data.data.available_courier_companies;

    const cheapestCourier = couriers.reduce((lowest, currentItem) => {
      return currentItem.freight_charge < lowest.freight_charge
        ? currentItem
        : lowest;
    });

    return response(
      res,
      200,
      true,
      "Cheapest courier fetched",
      cheapestCourier
    );
  } catch (err) {
    if (err.response?.status === 401) {
      await authenticate(); // Retry after re-authentication
      return getShippingRates(orderDetails);
    }
    throw err.message;
  }
};

const createShippingOrderController = async (req, res) => {
  try {
    const { oid } = req.params;

    if (!oid)
      return response(res, 400, false, "No oid. No shipping order creation");

    const order = await Order.findById(oid)
      .populate("product")
      .populate("customer");

    if (!order) return response(res, 404, false, "No orders found");

    const shiprocketData = {
      order_id: order._id,
      name: order.product.name,
      units: order.quantity,
      payment_method: order.paymentMethod,
      sub_total: order.orderValue,
      length: order.product.length,
      breadth: order.product.breadth,
      height: order.product.height,
      weight: order.product.weight,
      billing_customer_name: `${order.customer.fName} ${order.customer.lName}`,
      billing_email: order.customer.email,
      billing_phone: order.customer.contactNo,
      billing_building_no: order.customer.contactDetails.address.buildingNo,
      billing_street_no: order.customer.contactDetails.address.streetNo,
      billing_locality: order.customer.contactDetails.address.locality,
      billing_district: order.customer.contactDetails.address.district,
      billing_landmark: order.customer.contactDetails.address.landmark,
      billing_city: order.customer.contactDetails.address.city,
      billing_state: order.customer.contactDetails.address.state,
      billing_pincode: order.customer.contactDetails.address.pincode,
    };

    // 3. Create Shiprocket order
    const shiprocketResponse = await createShippingOrder(shiprocketData);

    // 4. Update MongoDB order with Shiprocket data
    order.shipmentId = shiprocketResponse.shipment_id;
    order.trackingNumber = shiprocketResponse.tracking_number;
    await order.save();
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { fetchCheapestCourierController, createShippingOrderController };
