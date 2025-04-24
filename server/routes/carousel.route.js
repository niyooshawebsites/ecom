import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createProductsCarouselItemController,
  deleteProductsCarourselItemController,
  fetchAllProductsCarouselTypeItemsController,
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

export default carouselRouter;
