import express from "express";
import {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  fetchAllOrdersController,
  fetchOrdersByStatusController,
  fetchOrderController,
  fetchCustomerOrdersController,
  fetchOrdersByDatesController,
  deleteOrdersController,
} from "../controllers/order.controller.js";
import auth from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-order/:pid", createOrderController);
orderRouter.patch("/update-order/:oid", auth, updateOrderController);
orderRouter.delete("/delete-order/:oid", auth, deleteOrderController);
orderRouter.delete("/delete-orders", auth, deleteOrdersController);
orderRouter.get("/fetch-all-orders/:pageNo", auth, fetchAllOrdersController);
orderRouter.get("/fetch-order/:oid", auth, fetchOrderController);
orderRouter.get(
  "/fetch-customer-orders/:uid",
  auth,
  fetchCustomerOrdersController
);
orderRouter.get(
  "/fetch-orders-by-status/:status",
  auth,
  fetchOrdersByStatusController
);
orderRouter.get(
  "/fetch-orders-by-dates/:startDate/:endDate",
  auth,
  fetchOrdersByDatesController
);

export default orderRouter;
