import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { generateInvoiceController } from "../controllers/invoice.controller.js";

const invoiceRouter = express.Router();

invoiceRouter.get("/generate-invoice/:oid", auth, generateInvoiceController);

export default invoiceRouter;
