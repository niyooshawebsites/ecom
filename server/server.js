import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import couponRouter from "./routes/coupon.route.js";
import paymentRouter from "./routes/payment.route.js";
import invoiceRouter from "./routes/invoice.route.js";
import taxRouter from "./routes/tax.route.js";
import galleryRouter from "./routes/gallery.route.js";
import shippingRouter from "./routes/shipping.route.js";
import carouselRouter from "./routes/carousel.route.js";
import sliderRouter from "./routes/slider.route.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 7500;
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan());

// routes
app.use(BASE_URL, userRouter);
app.use(BASE_URL, productRouter);
app.use(BASE_URL, categoryRouter);
app.use(BASE_URL, orderRouter);
app.use(BASE_URL, reviewRouter);
app.use(BASE_URL, couponRouter);
app.use(BASE_URL, paymentRouter);
app.use(BASE_URL, invoiceRouter);
app.use(BASE_URL, taxRouter);
app.use(BASE_URL, galleryRouter);
app.use(BASE_URL, shippingRouter);
app.use(BASE_URL, carouselRouter);
app.use(BASE_URL, sliderRouter);

app.listen(PORT, () =>
  console.log(
    `The sever is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .bgCyan
  )
);
