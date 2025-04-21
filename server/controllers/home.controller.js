import Carousel from "../models/carousel.model.js";
import Slider from "../models/slider.model.js";
import Product from "../models/product.model.js";
import response from "../utils/response.js";
import { getImageURL } from "../utils/s3.js";

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

    const product = await Product.findById(pid);

    if (!product) return response(res, 404, false, "No product found");

    const carouselItem = await new Carousel({
      pid,
      product,
      carouselType,
    }).save();

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
    const carouselItems = await Carousel.find()
      .sort({
        createdAt: -1,
      })
      .populate("product");

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

const createSliderItemController = async (req, res) => {
  try {
    // extract the image url from multer upload - keys are already added my multer s3
    const imgKey = req.files.img[0].key;

    if (!imgKey) return response(res, 400, false, "No image is selected");

    const newSlide = await new Slider({
      img: imgKey,
    }).save();

    return response(res, 201, true, "Slide created successfully", newSlide);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteSliderItemController = async (req, res) => {
  try {
    const { slideId } = req.params;
    if (!slideId)
      return response(res, 400, false, "No slide id. No slide deletion");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createProductsCarouselItemController,
  deleteProductsCarourselItemController,
  fetchAllProductsCarouselTypeItemsController,
  createSliderItemController,
};
