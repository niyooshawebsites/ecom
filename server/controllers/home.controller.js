import Carousel from "../models/carousel.model.js";
import response from "../utils/response.js";

const createProductsCarouselItemController = async (req, res) => {
  try {
    const itemsCount = Carousel.countDocuments();

    if (itemsCount >= 10)
      return response(res, 403, false, "More than 10 items are not allowed");

    const { pid, carouselType } = req.body;

    if (!pid)
      return response(
        res,
        400,
        false,
        "No pid! No product to be added to featured carousel"
      );

    const exisitingCarouselItem = await Carousel.findOne({ pid });

    if (exisitingCarouselItem)
      return response(res, 400, false, "Pid already exists in the carousel");

    const carouselItem = await new Carousel({ pid, carouselType }).save();

    return response(
      res,
      201,
      true,
      "Product carousel item created successfully",
      carouselItem
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteProductsCarourselItemController = async (req, res) => {
  try {
    const { cid } = req.params;

    if (!cid)
      return response(
        res,
        400,
        false,
        "No pid! No product to be deleted from the featured carousel"
      );

    const result = await Carousel.findByIdAndDelete(cid);

    return response(res, 200, true, "carousel item deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllProductsCarouselTypeItemsController = async (req, res) => {
  try {
    const { carouselType } = req.params;

    if (!carouselType)
      return response(res, 400, false, "No carousel type. No carousel items");

    const carouselItems = await Carousel.find({ carouselType }).sort({
      createdAt: -1,
    });

    if (carouselItems.length === 0)
      return response(res, 404, false, "No carousel items found");

    return response(
      res,
      200,
      true,
      "Carousel items fected successfully",
      carouselItems
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createProductsCarouselItemController,
  deleteProductsCarourselItemController,
  fetchAllProductsCarouselTypeItemsController,
};
