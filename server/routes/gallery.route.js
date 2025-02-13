import express from "express";
import upload from "../middlewares/upload.js";
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
  upload.fields([{ name: "images", maxCount: 5 }]),
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
