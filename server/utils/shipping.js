import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getShippingAuthToken = async () => {
  try {
    // Authenticate and fetch token
    const authResponse = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    return authResponse.data.token;
  } catch (err) {
    throw new Error("Failed to authenticate with Shiprocket", err);
  }
};

// get the shipping rates
const getShippingRates = async (authToken, pincode, weight, cod) => {
  try {
    // fetching the rates after login
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
      {
        params: {
          pickup_postcode: process.env.STORE_PINCODE,
          delivery_postcode: pincode,
          weight,
          cod,
        },

        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    return response.data.data.available_courier_companies;
  } catch (err) {
    throw new Error("Failed to fetch shipping rates", err);
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

export { getShippingAuthToken, getShippingRates, createShippingOrder };
