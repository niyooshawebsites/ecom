import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { uploadProductImgs } from "../middlewares/upload.middleware.js";

import {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
  fetchAllProductsByCategoryController,
  fetchAllProductsBySlugController,
  fetchAllProductsByPriceRangeController,
  deleteMultipleProductsController,
  ajaxSearchProductsController,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post(
  "/create-product",
  auth,
  uploadProductImgs.fields([
    { name: "img", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  createProductController
);
productRouter.patch(
  "/update-product/:pid",
  auth,
  uploadProductImgs.fields([
    { name: "img", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  updateProductController
);

productRouter.delete("/delete-product/:pid", auth, deleteProductController);

productRouter.delete(
  "/delete-products",
  auth,
  deleteMultipleProductsController
);

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

productRouter.get(
  "/ajax-product-search/:ajaxProductSearchText",
  ajaxSearchProductsController
);

export default productRouter;
