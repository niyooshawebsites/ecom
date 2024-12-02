import express from "express";
import { registerController } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);

export default userRouter;
