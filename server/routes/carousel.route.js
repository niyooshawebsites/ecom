import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createProductsCarouselItemController,
  deleteProductsCarourselItemController,
  fetchAllProductsCarouselTypeItemsController,
  fetchAllCarouselProductsController,
} from "../controllers/home.controller.js";
const carouselRouter = express.Router();

carouselRouter.post(
  "/create-products-carousel",
  auth,
  createProductsCarouselItemController
);

carouselRouter.delete(
  "/delete-carousel-product/:cid",
  auth,
  deleteProductsCarourselItemController
);

carouselRouter.get(
  "/fetch-carousel-products/:carouselType",
  auth,
  fetchAllProductsCarouselTypeItemsController
);

carouselRouter.get(
  "/fetch-all-carousel-products",
  fetchAllCarouselProductsController
);

export default carouselRouter;
