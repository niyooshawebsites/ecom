import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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

// Get shipping rates
const getCheapestCourier = async (orderDetails) => {
  try {
    await ensureAuth();

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

    return cheapestCourier;
  } catch (err) {
    if (err.response?.status === 401) {
      await authenticate(); // Retry after re-authentication
      return getShippingRates(orderDetails);
    }
    throw err.message;
  }
};

// Create Shiprocket order
const createShippingOrder = async (orderData) => {
  try {
    await ensureAuth();
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      await authenticate();
      return createOrder(orderData);
    }
    throw err.message;
  }
};

export { getCheapestCourier, createShippingOrder };
