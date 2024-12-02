import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/auth/login", loginController);

export default userRouter;
