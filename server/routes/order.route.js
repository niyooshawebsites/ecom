import express from "express";
import {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  fetchAllOrdersController,
  fetchOrderController,
  fetchCustomerOrdersController,
} from "../controllers/order.controller.js";
import auth from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-order/:pid", createOrderController);
orderRouter.patch("/update-order/:oid", auth, updateOrderController);
orderRouter.delete("/delete-order/:oid", auth, deleteOrderController);
orderRouter.get("/fetch-all-orders", auth, fetchAllOrdersController);
orderRouter.get("/fetch-order/:oid", auth, fetchOrderController);
orderRouter.get(
  "fetch-customer-orders/:uid",
  auth,
  fetchCustomerOrdersController
);

export default orderRouter;
