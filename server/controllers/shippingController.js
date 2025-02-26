import Order from "../models/order.model.js";
import response from "../utils/response.js";

const createShippingOrderController = async (req, res) => {
  try {
    const { oid } = req.params;

    if (!oid)
      return response(res, 400, false, "No oid. No shipping order creation");

    const order = await Order.findById(oid)
      .populate("product")
      .populate("customer");

    if (!order) return response(res, 404, false, "No orders found");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { createShippingOrderController };
