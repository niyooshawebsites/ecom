import express from "express";

import {
  createTaxController,
  updateTaxController,
  fetchAllTaxesController,
  fetchTaxController,
  deleteTaxController,
  deleteTaxesController,
  fetchTaxByStateController,
  fetchTaxByStateWithoutLoginController,
} from "../controllers/tax.controller.js";
import auth from "../middlewares/auth.middleware.js";

const taxRouter = express.Router();

taxRouter.post("/create-tax", auth, createTaxController);
taxRouter.patch("/update-tax/:tid", auth, updateTaxController);
taxRouter.delete("/delete-tax/:cid", auth, deleteTaxController);
taxRouter.delete("/delete-taxes/:tids", auth, deleteTaxesController);
taxRouter.get("/fetch-all-taxes/:pageNo", auth, fetchAllTaxesController);
taxRouter.get("/fetch-tax/:tid", auth, fetchTaxController);
taxRouter.get("/fetch-tax-by-state/:state", auth, fetchTaxByStateController);
taxRouter.get(
  "/fetch-tax-by-state-without-login/:state",
  fetchTaxByStateWithoutLoginController
);

export default taxRouter;
