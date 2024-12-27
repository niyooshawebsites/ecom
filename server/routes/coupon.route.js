import express from "express"
import auth from "../middlewares/auth.middleware.js";
import {createCounponController, updateCouponController, fetchCouponController, fetchAllCouponsController, deleteCouponController} from "../controllers/counpon.controller.js"
const couponRouter = express.Router();

couponRouter.post("/create-coupon", auth, createCounponController);
couponRouter.patch("/update-coupon/:ccid", auth, updateCouponController);
couponRouter.fet("/fetch-coupon/:ccid", auth, fetchCouponController);
couponRouter.post("/fetch-all-coupons", auth, fetchAllCouponsController);
couponRouter.post("/delete-coupon/:ccid", auth, deleteCouponController);

export default couponRouter;