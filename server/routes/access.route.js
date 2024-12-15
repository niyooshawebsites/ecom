import express from "express";
const accessRouter = express.Router();
import { checkAccessController } from "../controllers/access.controller.js";
import auth from "../middlewares/auth.middleware.js";

accessRouter.get("/check-access/:uid", auth, checkAccessController);

export default accessRouter;
