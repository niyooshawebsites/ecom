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
categoryRouter.patch("/udpate-category/:cid", auth, updateCategoryController);
categoryRouter.delete("/delete-category/:cid", auth, deleteCategoryController);
categoryRouter.get("/fetch-all-categories", fetchAllCategoriesController);
categoryRouter.get("/fetch-category/:cid", fetchCategoryController);

export default categoryRouter;
