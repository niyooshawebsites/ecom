import express from "express";
import { uploadGalleryImgs } from "../middlewares/upload.middleware.js";
import auth from "../middlewares/auth.middleware.js";
import {
  uploadGalleryImagesController,
  fetchAllGalleryImagesController,
  deleteGalleryImageController,
  deleteGalleryImagesController,
} from "../controllers/gallery.controller.js";

const galleryRouter = express.Router();

galleryRouter.post(
  "/upload-gallery-images",
  auth,
  uploadGalleryImgs.fields([{ name: "imgKeys", maxCount: 5 }]),
  uploadGalleryImagesController
);

galleryRouter.get(
  "/fetch-all-gallery-images/:pageNo",
  auth,
  fetchAllGalleryImagesController
);

galleryRouter.delete(
  "/delete-gallery-image/:giid",
  auth,
  deleteGalleryImageController
);

galleryRouter.delete(
  "delete-gallery-images/:giids",
  auth,
  deleteGalleryImagesController
);

export default galleryRouter;
