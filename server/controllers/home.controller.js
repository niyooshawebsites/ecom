import Carousel from "../models/carousel.model.js";
import response from "../utils/response.js";

const createProductsCarouselController = async (req, res) => {
  try {
    const { pid } = req.body;

    if (!pid)
      return response(
        res,
        400,
        false,
        "No pid! No product to be added to featured carousel"
      );

    const exisitingProduct = await Product.findById(pid);

    if (exisitingProduct)
      return response(res, 400, false, "Pid already exists");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { createProductsCarouselController };
