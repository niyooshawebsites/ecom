import express from "express";
import auth from "../middlewares/auth.middeware.js";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/create-product", auth, createProductController);
productRouter.patch("/update-product/:pid", auth, updateProductController);
productRouter.delete("/delete-product/:pid", auth, deleteProductController);
productRouter.get("/fetch-all-products", fetchAllProductsController);
productRouter.get("/fetch-product/:pid", fetchProductController);

export default productRouter;
