import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createCounponController,
  updateCouponController,
  fetchCouponForUpdationController,
  fetchCouponController,
  fetchAllCouponsController,
  deleteCouponController,
  applyCouponController,
  deleteCouponsController,
} from "../controllers/counpon.controller.js";
const couponRouter = express.Router();

couponRouter.post("/create-coupon", auth, createCounponController);
couponRouter.patch("/update-coupon/:ccid", auth, updateCouponController);
couponRouter.get(
  "/fetch-coupon-for-updation/:ccid",
  auth,
  fetchCouponForUpdationController
);
couponRouter.get("/fetch-coupon/:couponCode", auth, fetchCouponController);
couponRouter.get("/fetch-coupons/:pageNo", auth, fetchAllCouponsController);
couponRouter.delete("/delete-coupon/:ccid", auth, deleteCouponController);
couponRouter.delete("/delete-coupons/:ccids", auth, deleteCouponsController);
couponRouter.post("/apply-coupon/:cartTotal", applyCouponController);

export default couponRouter;
