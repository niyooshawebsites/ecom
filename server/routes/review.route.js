import express from "express";
import {
  createReviewController,
  deleteReviewController,
  fetchReviewsByProductsController,
} from "../controllers/review.controller.js";
import auth from "../middlewares/auth.middeware.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review/:pid", auth, createReviewController);
reviewRouter.delete("/delete-review/:pid", auth, deleteReviewController);
reviewRouter.get("/fetch-product-review/", fetchReviewsByProductsController);

export default reviewRouter;
