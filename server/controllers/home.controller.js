import Product from "../models/product.model.js";
import response from "../utils/response.js";

const createFeaturedProductsController = async (req, res) => {
  try {
    const { pid } = req.body;

    if (!pid)
      response(
        res,
        400,
        false,
        "No pid! No product to be added to featured carousel"
      );

    const exisitingProduct = await Product.findById(pid);

    if (exisitingProduct) response(res, 400, false, "Pid already exists");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};
