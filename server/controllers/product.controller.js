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
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!pid) response(res, 400, false, "No product id!. No updation!");

    const updatedSlug = slugify(name, { lower: true, strict: true });

    if (!name || !price || !updatedSlug || !category || !shortDesc || !longDesc)
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
    console.log(pid);
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
      .sort({ createdAt: -1 })
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

    const product = await Product.findById(pid).populate("category");
    if (!product) return response(res, 404, false, "Product not found");

    return response(res, 200, true, "Product found successfully", product);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsByCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;

    if (!cid) return response(res, 400, false, "Cateogry Id is missing");

    const products = await Product.find({ category: cid })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this category");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.log(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsBySlugController = async (req, res) => {
  try {
    const { pSlug } = req.params;

    if (!pSlug) return response(res, 400, false, "Product slug is missing");

    const products = await Product.find({
      slug: { $regex: pSlug, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this category");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.log(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsByPriceRangeController = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;

    if (!minPrice) return response(res, 400, false, "Min price is missing");
    if (!maxPrice) return response(res, 400, false, "Max price is missing");

    const products = await Product.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
    })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this price range");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.log(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

export {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
  fetchAllProductsByCategoryController,
  fetchAllProductsBySlugController,
  fetchAllProductsByPriceRangeController,
};
