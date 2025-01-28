import express from "express";
import {
  createReviewController,
  deleteReviewController,
  fetchReviewsByProductsController,
  fetchReviewsController,
  updateReviewController,
} from "../controllers/review.controller.js";
import auth from "../middlewares/auth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review/:pid", auth, createReviewController);
reviewRouter.delete("/delete-review/:rid", auth, deleteReviewController);
reviewRouter.get(
  "/fetch-reviews/:pid/:pageNo",
  fetchReviewsByProductsController
);
reviewRouter.get("/fetch-reviews/:pageNo", auth, fetchReviewsController);
reviewRouter.patch("/update-review", auth, updateReviewController);

export default reviewRouter;
