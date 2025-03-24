import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createProductsCarouselController } from "../controllers/home.controller.js";
const carouselRouter = express.Router();

carouselRouter.post(
  "/products-carousel",
  auth,
  createProductsCarouselController
);

export default carouselRouter;
