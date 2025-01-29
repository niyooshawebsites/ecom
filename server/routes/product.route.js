import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
  fetchAllProductsByCategoryController,
  fetchAllProductsBySlugController,
  fetchAllProductsByPriceRangeController,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/create-product", auth, createProductController);
productRouter.patch("/update-product/:pid", auth, updateProductController);
productRouter.delete("/delete-product/:pid", auth, deleteProductController);
productRouter.get("/fetch-all-products/:pageNo", fetchAllProductsController);
productRouter.get("/fetch-product/:pid", fetchProductController);
productRouter.get(
  "/fetch-all-products-by-category/:cid",
  fetchAllProductsByCategoryController
);
productRouter.get(
  "/fetch-all-products-by-slug/:pSlug",
  fetchAllProductsBySlugController
);
productRouter.get(
  "/fetch-all-products-by-price-range/:minPrice/:maxPrice",
  fetchAllProductsByPriceRangeController
);

export default productRouter;
