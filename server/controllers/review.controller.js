import Review from "../models/review.model.js";
import response from "../utils/response.js";

const createReviewController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { rating, reviewMsg, uid } = req.body;

    if (!pid) return response(res, 400, false, "No pid. No review");
    if (!rating) return response(res, 400, false, "Rating missing");
    if (!reviewMsg) return response(res, 400, false, "Review msg missing");
    if (!uid) return response(res, 400, false, "Uid missing");

    const newReview = await new Review({
      product: pid,
      rating,
      reviewMsg,
      reviewer: uid,
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
    const { pid, pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;
    if (!pid) return response(res, 400, false, "No pid. No review");

    const reviewsPerPage = await Review.find({ product: pid })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("reviewer");

    if (reviewsPerPage.length == 0)
      return response(res, 404, false, "No reviews for given product");

    const totalReviewsCount = Review.countDocuments();
    const totalPagesCount = Math.ceil(totalReviewsCount / limit);

    return response(
      res,
      200,
      true,
      "Reviews found for given product",
      reviewsPerPage,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchReviewsController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const reviews = await Review.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("product");

    if (reviews.length == 0) return response(res, 404, false, "No reviews.");

    const totalReviewsCount = await Review.countDocuments();
    const totalPagesCount = Math.ceil(totalReviewsCount / limit);

    return response(
      res,
      200,
      true,
      "All reviews fetched",
      reviews,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateReviewController = async (req, res) => {
  try {
    const { rid, status } = req.body;

    if (!rid) return response(res, 404, false, "No rid. No review updation");
    if (!status)
      return response(res, 404, false, "No status. No review updation");

    const updatedReview = await Review.findByIdAndUpdate(
      rid,
      { status },
      { new: true }
    );

    return response(
      res,
      200,
      true,
      "Review status updated successfully",
      updatedReview
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createReviewController,
  deleteReviewController,
  fetchReviewsByProductsController,
  fetchReviewsController,
  updateReviewController,
};
