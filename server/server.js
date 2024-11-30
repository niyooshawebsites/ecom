import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
connectDB();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());

app.listen(PORT, () =>
  console.log(
    `The sever is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .bgCyan
  )
);
