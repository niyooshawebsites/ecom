import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fetchAllCategoriesController,
  fetchCategoryController,
} from "../controllers/category.controller";
import auth from "../middlewares/auth.middeware.js";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", auth, createCategoryController);
categoryRouter.post("/udpate-category/:cid", auth, updateCategoryController);
categoryRouter.post("/delete-category/:cid", auth, deleteCategoryController);
categoryRouter.post("/fetch-all-categories", fetchAllCategoriesController);
categoryRouter.post("/fetch-category/:cid", fetchCategoryController);

export default categoryRouter;
