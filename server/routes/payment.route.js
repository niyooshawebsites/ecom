import express from "express";

const paymentRouter = express.Router();
import {
  createRazorpayOrderController,
  verifyPaymentController,
} from "../controllers/paymentController.js";

paymentRouter.post("/create-razorpay-order", createRazorpayOrderController);
paymentRouter.post("/verify-razorpay-payment", verifyPaymentController);

export default paymentRouter;
