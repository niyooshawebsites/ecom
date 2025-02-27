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

export { ensureAuth, createShippingOrder };
