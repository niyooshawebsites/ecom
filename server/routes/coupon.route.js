import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createCounponController,
  updateCouponController,
  fetchCouponController,
  fetchAllCouponsController,
  deleteCouponController,
  applyCouponController,
} from "../controllers/counpon.controller.js";
const couponRouter = express.Router();

couponRouter.post("/create-coupon", auth, createCounponController);
couponRouter.patch("/update-coupon/:ccid", auth, updateCouponController);
couponRouter.get("/fetch-coupon/:ccid", auth, fetchCouponController);
couponRouter.get("/fetch-coupons/:pageNo", auth, fetchAllCouponsController);
couponRouter.post("/delete-coupon/:ccid", auth, deleteCouponController);
couponRouter.post("/apply-coupon/:cartTotal", applyCouponController);

export default couponRouter;
