import express from "express";
import {
  createReviewController,
  deleteReviewController,
  fetchReviewsByProductsController,
  fetchReviewsController,
  updateReviewController,
  fetchReviewsByProductNameController,
  fetchReviewsByRatingController,
  fetchReviewsByStatusController,
  deleteReiewsController,
} from "../controllers/review.controller.js";
import auth from "../middlewares/auth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review/:pid", auth, createReviewController);
reviewRouter.delete("/delete-review/:rid", auth, deleteReviewController);
reviewRouter.delete("/delete-reviews/:rids", auth, deleteReiewsController);
reviewRouter.get(
  "/fetch-reviews/:pid/:pageNo",
  fetchReviewsByProductsController
);
reviewRouter.get("/fetch-reviews/:pageNo", auth, fetchReviewsController);
reviewRouter.patch("/update-review", auth, updateReviewController);
reviewRouter.get(
  "/fetch-reviews-by-product-name/:pName",
  auth,
  fetchReviewsByProductNameController
);
reviewRouter.get(
  "/fetch-reviews-by-rating/:rating",
  auth,
  fetchReviewsByRatingController
);
reviewRouter.get(
  "/fetch-reviews-by-status/:status",
  auth,
  fetchReviewsByStatusController
);

export default reviewRouter;
