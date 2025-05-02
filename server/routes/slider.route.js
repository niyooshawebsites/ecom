import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createSliderItemController,
  deleteSliderItemController,
  fetchAllImageSlidesController,
} from "../controllers/home.controller.js";
import { uploadSlides } from "../middlewares/upload.middleware.js";

const sliderRouter = express.Router();

sliderRouter.post(
  "/create-slider-item",
  auth,
  uploadSlides.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  createSliderItemController
);

sliderRouter.delete(
  "/delete-slider-item/:sid",
  auth,
  deleteSliderItemController
);

sliderRouter.get("/fetch-all-image-slides", fetchAllImageSlidesController);

export default sliderRouter;
