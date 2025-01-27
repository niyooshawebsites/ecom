import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  fetchAllUsersController,
  fetchUserController,
  updateUserPasswordController,
  deleteUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController,
  updateContactDetailsController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import verifyEmail from "../middlewares/verifyEmail.middleware.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/auth/login", loginController);
userRouter.get("/auth/logout", auth, logoutController);
userRouter.get("/fetch-all-users", auth, fetchAllUsersController);
userRouter.get("/fetch-user/:uid", auth, fetchUserController);
userRouter.patch(
  "/update-user-password/:uid",
  auth,
  updateUserPasswordController
);
userRouter.get("/delete-user/:uid", auth, deleteUserController);
userRouter.get("/verify-email/:authToken", verifyEmail, verifyUserController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.patch(
  "/reset-password/:authToken",
  verifyEmail,
  resetPasswordController
);
userRouter.patch(
  "/update-contact-details/:uid",
  auth,
  updateContactDetailsController
);

export default userRouter;
