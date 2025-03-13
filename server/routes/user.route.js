import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  fetchAllUsersController,
  fetchUserController,
  fetchUserAtOrderCreationController,
  updateUserPasswordController,
  deleteUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController,
  updateContactDetailsController,
  updateContactDetailsWhilePlcingOrderController,
  updateActivationStatusController,
  fetchUserByEmailController,
  fetchUserByActiveStatusController,
  fetchUserByVerificationStatusController,
  fetchUserByDatesController,
  deleteUsersController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import verifyEmail from "../middlewares/verifyEmail.middleware.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/auth/login", loginController);
userRouter.get("/auth/logout", auth, logoutController);
userRouter.get("/fetch-all-users/:uid", auth, fetchAllUsersController);
userRouter.get("/fetch-user/:uid", auth, fetchUserController);
userRouter.get(
  "/fetch-user-at-order-creation/:username/:email",
  fetchUserAtOrderCreationController
);
userRouter.patch(
  "/update-user-password/:uid",
  auth,
  updateUserPasswordController
);
userRouter.delete("/delete-user/:uid", auth, deleteUserController);
userRouter.delete("/delete-users", auth, deleteUsersController);
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
userRouter.patch(
  "/update-contact-details-while-placing-order/:uid",
  updateContactDetailsWhilePlcingOrderController
);
userRouter.patch(
  "/update-activation-status/:uid",
  auth,
  updateActivationStatusController
);
userRouter.get(
  "/fetch-user-by-email/:userEmail",
  auth,
  fetchUserByEmailController
);
userRouter.get(
  "/fetch-users-by-active-status/:activeStatus",
  auth,
  fetchUserByActiveStatusController
);
userRouter.get(
  "/fetch-users-by-verification-status/:verificationStatus",
  auth,
  fetchUserByVerificationStatusController
);
userRouter.get(
  "/fetch-users-by-dates/:startDate/:endDate",
  auth,
  fetchUserByDatesController
);

export default userRouter;
