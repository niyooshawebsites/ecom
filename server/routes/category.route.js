import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fetchAllCategoriesController,
  fetchAllCategoriesAtOnceController,
  fetchCategoryController,
  deleteCategoriesController,
} from "../controllers/category.controller.js";
import auth from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", auth, createCategoryController);
categoryRouter.patch("/update-category/:cid", auth, updateCategoryController);
categoryRouter.delete("/delete-category/:cid", auth, deleteCategoryController);
categoryRouter.delete("/delete-categories", auth, deleteCategoriesController);
categoryRouter.get(
  "/fetch-all-categories/:pageNo",
  fetchAllCategoriesController
);
categoryRouter.get(
  "/fetch-all-categories-at-once",
  fetchAllCategoriesAtOnceController
);
categoryRouter.get("/fetch-category/:cid", fetchCategoryController);

export default categoryRouter;
