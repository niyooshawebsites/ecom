import express from "express";
import {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  fetchAllOrdersController,
  fetchOrderController,
} from "../controllers/order.controller.js";
import auth from "../middlewares/auth.middeware.js";

const orderRouter = express.Router();

orderRouter.post("/create-order/:pid", createOrderController);
orderRouter.patch("/update-order/:oid", auth, updateOrderController);
orderRouter.delete("/delete-order/:oid", auth, deleteOrderController);
orderRouter.get("/fetch-all-orders/:oid", auth, fetchAllOrdersController);
orderRouter.get("/fetch-order/:oid", auth, fetchOrderController);

export default orderRouter;
