import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import response from "../utils/response.js";
import Tax from "../models/tax.model.js";

const createOrderController = async (req, res) => {
  try {
    const { pid } = req.params;

    const {
      uid,
      quantity,
      orderNote,
      paymentMethod,
      paymentStatus,
      tnxId,
      CGSTRate,
      SGSTRate,
      CGST,
      SGST,
      totalTax,
      netPayable,
    } = req.body;

    if (!pid) return response(res, 400, false, "No pid. No order");
    if (!uid) return response(res, 400, false, "No uid. No order");

    if (!quantity) return response(res, 400, false, "No quantity. No order");
    if (!paymentMethod)
      return response(res, 400, false, "No payment method. No order");
    if (!paymentStatus)
      return response(res, 400, false, "No payment status. No order");
    if (!CGSTRate) return response(res, 400, false, "No CGST rate. No order");
    if (!SGSTRate) return response(res, 400, false, "No SGST rate. No order");
    if (!CGST) return response(res, 400, false, "No SGST. No order");
    if (!SGST) return response(res, 400, false, "No SGST. No order");
    if (!totalTax) return response(res, 400, false, "No total tax. No order");
    if (!netPayable)
      return response(res, 400, false, "No net payable. No order");

    // const product = await Product.findById(pid);

    // if (!product)
    //   return response(res, 404, false, "Product not found. No order");

    const customer = await User.findById(uid);

    if (!customer)
      return response(res, 404, false, "Cusotmer not found. No order");

    const state = customer.contactDetails?.address?.state;
    if (!state) return response(res, 404, false, "State not found. No order");

    const tax = await Tax.find({ state });

    const order = await new Order({
      product: pid,
      customer: uid,
      quantity,
      orderNote: orderNote || null,
      paymentMethod,
      paymentStatus,
      tnxId,
      CGSTRate,
      SGSTRate,
      CGST,
      SGST,
      totalTax,
      netPayable,
    }).save();

    return response(res, 201, true, "New order created", order);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateOrderController = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
    if (!oid) return response(res, 400, false, "No oid. No order updation");

    const updatedOrder = await Order.findByIdAndUpdate(
      oid,
      { status },
      { new: true, runValidators: true } // mongoose validation only works on save or create new data by default so we need to use runValidators in updation
    );

    return response(res, 201, true, "Order details updated");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteOrderController = async (req, res) => {
  try {
    const { oid } = req.params;
    if (!oid) return response(res, 400, false, "No oid. No deletion");

    const result = await Order.findByIdAndDelete(oid);

    return response(res, 200, true, "Order deleted");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllOrdersController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo);
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("product")
      .populate("customer");

    if (orders.length == 0)
      return response(res, 404, false, "No orders found.");

    const totalOrdersCount = await Order.countDocuments();
    const totalPagesCount = Math.ceil(totalOrdersCount / limit);

    return response(
      res,
      200,
      true,
      "All orders fetched",
      orders,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchOrderController = async (req, res) => {
  try {
    const { oid } = req.params;
    if (!oid) return response(res, 400, false, "No oid. No order details");

    const order = await Order.findById(oid)
      .populate("product")
      .populate("customer");

    if (!order) return response(res, 404, false, "No order found");

    return response(res, 200, true, "Order fetched", order);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchCustomerOrdersController = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid)
      return response(res, 400, false, "No uid. No orders per customer");

    const orders = await Order.find({ customer: uid })
      .sort({ createdAt: -1 })
      .populate("product");

    if (orders.length === 0)
      return response(res, 404, false, "No orders found");

    return response(res, 200, true, "Orders fetched", orders);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchOrdersByDatesController = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    if (!startDate || !endDate)
      return response(res, 400, false, "Please select the dates");

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("product");

    if (orders.length === 0)
      return response(res, 404, false, "No orders found");

    return response(res, 200, true, "Orders fetched", orders);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchOrdersByStatusController = async (req, res) => {
  try {
    const { status } = req.params;

    if (!status) return response(res, 400, false, "Status is missing");

    const orders = await Order.find({ status }).populate("product");

    if (orders.length === 0)
      return response(res, 404, false, "No orders found");

    return response(res, 200, true, "Orders fetched", orders);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteOrdersController = async (req, res) => {
  try {
    const { oids } = req.params;

    if (!oids || !Array.isArray(oids) || oids.length === 0)
      return response(res, 400, false, "No oids. No multiple deletion");

    const result = await Order.deleteMany({ _id: { $in: oids } });

    return response(res, 200, true, "Orders deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  fetchAllOrdersController,
  fetchOrdersByStatusController,
  fetchOrderController,
  fetchCustomerOrdersController,
  fetchOrdersByDatesController,
  deleteOrdersController,
};
