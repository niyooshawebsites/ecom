import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createSliderItemController,
  deleteSliderItemController,
  fetchAllImageSlidesController,
} from "../controllers/home.controller.js";

const sliderRouter = express.Router();

sliderRouter.post("/create-slider-item", auth, createSliderItemController);
sliderRouter.delete(
  "/delete-slider-item/:sid",
  auth,
  deleteSliderItemController
);
sliderRouter.get("/fetch-all-image-slides", fetchAllImageSlidesController);

export default sliderRouter;
