import Review from "../models/review.model.js";
import response from "../utils/response.js";

const createReviewController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { review } = req.body;

    if (!pid) return response(res, 400, false, "No pid. No review");
    if (!review) return response(res, 400, false, "Review missing");

    const newReview = await new Review({
      product: pid,
      review,
    }).save();

    return response(res, 201, true, "Review created successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteReviewController = async (req, res) => {
  try {
    const { rid } = req.params;
    if (!rid) return response(res, 400, false, "No rid. No deletion");

    const result = await Review.findByIdAndDelete(rid);

    return response(res, 200, true, "Review deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchReviewsByProductsController = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) return response(res, 400, false, "No pid. No review");

    const reviews = await Review.find({ product: pid });

    if (reviews.length == 0)
      return response(res, 404, false, "No reviews for given product");

    return response(res, 200, true, "Reviews found for given product");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createReviewController,
  deleteReviewController,
  fetchReviewsByProductsController,
};