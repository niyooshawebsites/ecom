import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.route.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 7500;
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());

// routes
app.use(BASE_URL, userRouter);

app.listen(PORT, () =>
  console.log(
    `The sever is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .bgCyan
  )
);
