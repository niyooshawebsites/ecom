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
productRouter.post("/update-product/:pid", auth, updateProductController);
productRouter.post("/delete-product/:pid", auth, deleteProductController);
productRouter.post("/fetch-all-products", fetchAllProductsController);
productRouter.post("/fetch-product/:pid", fetchProductController);

export default productRouter;
