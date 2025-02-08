import Order from "../models/order.model.js";
import response from "../utils/response.js";
import generateInvoice from "../utils/invoice.js";
import User from "../models/user.model.js";

const generateInvoiceController = async (req, res) => {
  try {
    const { oid } = req.params;
    if (!oid) return response(res, 400, false, "Oid is missing");

    const user = await User.findOne({ role: "admin" }).select("-password");

    const order = await Order.findById(oid)
      .populate("product")
      .populate("customer");
    if (!order) return response(res, 404, false, "No order found");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    generateInvoice(order, user, res);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { generateInvoiceController };
