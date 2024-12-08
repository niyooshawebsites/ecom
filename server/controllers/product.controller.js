import Product from "../models/product.model.js";
import response from "../utils/response.js";
import slugify from "slugify";

const createProductController = async (req, res) => {
  try {
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!name || !price || !category || !shortDesc || !longDesc)
      return response(res, 400, false, "Please fill out all the information");

    const product = await Product.findOne({ name });
    if (product) return response(res, 409, false, "Product already exists");

    const newProduct = await new Product({
      ...req.body,
      img: "https://www.tibertaber.com/cdn/shop/files/Tiber_Taber_Girls_Devi_Lehenga_Set_TTG24_033_Red_Mood_1_4b80dfdd-8258-4419-82f6-0c3d664fab7b.jpg?v=1727693111&width=493",
    }).save();
    return response(res, 201, true, "Product created successfully", newProduct);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, slug, price, category, shortDesc, longDesc } = req.body;

    const updatedSlug = slugify(slug, { lower: true, strict: true });

    if (!pid) response(res, 400, false, "No product id!. No updation!");

    if (!name || !price || !slug || !category || !shortDesc || !longDesc)
      return response(res, 400, false, "Please fill out all the details");

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      { ...req.body, slug: updatedSlug },
      {
        new: true,
      }
    );

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
    const totalPagesCount = Math.ceil(totalProductsCount / limit);

    return response(
      res,
      200,
      true,
      `${productsPerPage.length} products fetched`,
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
