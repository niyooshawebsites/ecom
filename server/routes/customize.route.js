import express from "express";
import {
  createCustomizationController,
  updateCustomizationController,
  fetchCustomizationController,
} from "../controllers/customize.controller.js";
import auth from "../middlewares/auth.middleware.js";

const customizeRouter = express.Router();

customizeRouter.post(
  "/create-customization",
  auth,
  createCustomizationController
);

customizeRouter.patch(
  "/update-customization",
  auth,
  updateCustomizationController
);

customizeRouter.get("/fetch-customization", fetchCustomizationController);

export default customizeRouter;
