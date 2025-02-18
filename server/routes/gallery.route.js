import express from "express";
import {
  uploadGalleryImgs,
  uploadLogo,
} from "../middlewares/upload.middleware.js";
import auth from "../middlewares/auth.middleware.js";
import {
  uploadGalleryImagesController,
  fetchAllGalleryImagesController,
  deleteGalleryImageController,
  deleteGalleryImagesController,
  uploadLogoController,
  fetchLogoController,
  deleteLogoController,
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

galleryRouter.post(
  "/upload-logo",
  auth,
  uploadLogo.single("logoKey"),
  uploadLogoController
);

galleryRouter.get("/fetch-logo", auth, fetchLogoController);

galleryRouter.delete("/delete-logo/:iid", auth, deleteLogoController);

export default galleryRouter;
