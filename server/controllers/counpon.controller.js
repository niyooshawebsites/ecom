import Coupon from "../models/coupon.model.js";
import response from "../utils/response.js";

const createCounponController = async (req, res) => {
  try {
    const { couponCode, expiresOn, amountDiscount, discount, products } =
      req.body;

    if (!couponCode || !expiresOn || !amountDiscount || !discount)
      return response(res, 400, false, "Coupon code details missing");

    const coupon = await new Coupon({
      couponCode,
      expiresOn,
      amountDiscount,
      discount,
      products,
    }).save();

    return response(res, 201, true, "Coupon code created successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { createCounponController };
