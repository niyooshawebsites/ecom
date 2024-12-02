import Category from "../models/category.model.js";
import response from "../utils/response.js";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return response(res, false, "Please fill out the category");

    const category = await Category.findOne({ name });
    if (category) return response(res, false, "Category already exists");

    const newCategory = await new Category({ name }).save();

    return response(res, true, "Category created successfully", newCategory);
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error");
  }
};

export { createCategoryController };
