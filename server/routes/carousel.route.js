import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createProductsCarouselItemController } from "../controllers/home.controller.js";
const carouselRouter = express.Router();

carouselRouter.post(
  "/products-carousel",
  auth,
  createProductsCarouselItemController
);

export default carouselRouter;
