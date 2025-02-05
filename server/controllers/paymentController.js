import Razorpay from "razorpay";
import crypto from "crypto";
import response from "../utils/response.js";

const createRazorpayOrderController = async (req, res) => {
  try {
    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const { amount, currency } = req.body;

    if (!amount) return response(res, 400, false, "Amount is missing");

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return response(
      res,
      200,
      true,
      "Razorpay order created successfully",
      order
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id)
      return response(res, 400, false, "Razorpay order ID is missing");

    if (!razorpay_payment_id)
      return response(res, 400, false, "Razorpay payment ID is missing");

    if (!razorpay_signature)
      return response(res, 400, false, "Razorpay signature is missing");

    const generatedRazorpaySignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedRazorpaySignature !== razorpay_signature)
      return response(res, 400, false, "Razorpay payment verfication failed");

    return response(res, 200, true, "Razorpay payment verification successful");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { createRazorpayOrderController, verifyPaymentController };
