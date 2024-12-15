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
import accessRouter from "./routes/access.route.js";

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
app.use(BASE_URL, accessRouter);

app.listen(PORT, () =>
  console.log(
    `The sever is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .bgCyan
  )
);
