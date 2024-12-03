import Product from "../models/product.model.js";
import response from "../utils/response.js";

const createProductController = async (req, res) => {
  try {
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!name || !price || !category || !shortDesc || !longDesc)
      return response(res, 400, false, "Please fill out all the information");

    const product = await Product.findOne({ name });
    if (product) return response(res, 409, false, "Product already exists");

    const newProduct = await new Product(req.body).save();
    return response(res, 201, true, "Product created successfully", newProduct);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!pid) response(res, 400, false, "No product id!. No updation!");

    if ((name, price, category, shortDesc, longDesc))
      return response(res, 400, false, "Please fill out all the details");

    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    return response(
      res,
      201,
      true,
      "Product updated successfully",
      updatedProduct
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Interal server error");
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) response(res, 400, false, "No product id. No deletion");

    const result = await Product.findByIdAndDelete(pid);
    return response(res, 200, true, "Product deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllProductsController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 12;
    const skip = (currentPageNo - 1) * limit;
    const productsPerPage = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category");

    const totalProductsCount = await Product.countDocuments();
    const totalPagesCount = totalProductsCount / limit;

    return response(
      res,
      200,
      true,
      "12 products fetched",
      productsPerPage,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) return response(res, 400, false, "Product ID is missing");

    const product = await Product.findById(pid);
    if (!product) return response(res, 404, false, "Product not found");

    return response(res, 200, true, "Product found successfully", product);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

export {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
};
