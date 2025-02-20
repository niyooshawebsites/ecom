import Category from "../models/category.model.js";
import response from "../utils/response.js";
import slugify from "slugify";
import categorySchema from "../validation/categoryScehma.js";
import { z } from "zod";

const createCategoryController = async (req, res) => {
  try {
    // sanitize and validate form data before sending to backend
    categorySchema.parse(req.body);

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
    if (err instanceof z.ZodError) {
      // If validation fails, send a detailed error response
      return res.status(400).json({
        errors: err.errors.map((e) => ({ message: e.message, path: e.path })),
      });
    }

    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCategoryController = async (req, res) => {
  try {
    categorySchema.parse(req.body);

    const { cid } = req.params;
    const { name } = req.body;

    if (!cid) return response(res, 400, false, "No cid. No updation");
    if (!name) return response(res, 400, false, "Category name is missing");

    const updatedSlug = slugify(name, { lower: true, strict: true });

    const updatedCategory = await Category.findByIdAndUpdate(
      cid,
      { name, slug: updatedSlug },
      { new: true }
    );

    if (!updatedCategory) {
      return response(res, 404, false, "Category not found.");
    }

    return response(
      res,
      201,
      true,
      "Category updated successfully",
      updatedCategory
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // If validation fails, send a detailed error response
      return res.status(400).json({
        errors: err.errors.map((e) => ({ message: e.message, path: e.path })),
      });
    }

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

    const categoriesPerPage = await Category.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (categoriesPerPage.length === 0)
      return response(res, 404, false, "No Categories found");

    const totalCategoriesCount = await Category.countDocuments();
    const totalPagesCount = Math.ceil(totalCategoriesCount / limit);
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

const fetchAllCategoriesAtOnceController = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    return response(
      res,
      200,
      true,
      "Categories fected successfully",
      categories
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

const deleteCategoriesController = async (req, res) => {
  try {
    const { cids } = req.params;

    if (!cids || !Array.isArray(cids) || cids.length === 0)
      return response(res, 400, false, "No cids. No multiple deletion");

    const result = await Category.deleteMany({ _id: { $in: cids } });

    return response(res, 200, true, "Categories deleted successfully");
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
  fetchAllCategoriesAtOnceController,
  fetchCategoryController,
  deleteCategoriesController,
};
