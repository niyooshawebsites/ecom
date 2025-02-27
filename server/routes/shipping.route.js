import express from "express";
const shippingRouter = express.Router();

import {
  fetchCheapestCourierController,
  createShippingOrderController,
} from "../controllers/shippingController.js";

shippingRouter.post("/shipping-rate", fetchCheapestCourierController);
shippingRouter.post(
  "/create-shipping-order/:oid",
  createShippingOrderController
);

export default shippingRouter;
