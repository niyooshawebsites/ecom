import Category from "../models/category.model.js";
import response from "../utils/response.js";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return response(res, 400, false, "Please fill out the category");

    const category = await Category.findOne({ name });
    if (category) return response(res, 409, false, "Category already exists");

    const newCategory = await new Category({ name }).save();

    return response(
      res,
      201,
      true,
      "Category created successfully",
      newCategory
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { name } = req.body;
    if (!cid) return response(res, 400, false, "No cid. No updation");

    const category = await Category.findByIdAndUpdate(
      cid,
      { name },
      { new: true }
    );

    return response(res, 201, true, "Category updated successfully", category);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;
    if (!cid) return response(res, 400, false, "No cid. No deletion");

    const result = await Category.findByIdAndDelete(cid);
    return response(res, 200, true, "Category deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllCategoriesController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const categoriesPerPage = await Category.find().skip(skip).limit(limit);
    const totalCategoriesCount = await Category.countDocuments();
    const totalPagesCount = totalCategoriesCount / limit;
    return response(
      res,
      200,
      true,
      "Categories fected successfully",
      categoriesPerPage,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, false, 500, "Internal server error");
  }
};

const fetchCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;
    if (!cid) return response(res, 400, false, "No cid. No category");

    const category = await Category.findById(cid);
    if (!category) return response(res, 404, false, "No category found");

    return response(res, 200, true, "Category found successful", category);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fetchAllCategoriesController,
  fetchCategoryController,
};
