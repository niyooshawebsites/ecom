import express from "express";

const shippingRouter = express.Router();

shippingRouter.post("/shipping-auth", shippingAuthController);
shippingRouter.post("/shipping-rate", shippingRateController);

export default shippingRouter;
