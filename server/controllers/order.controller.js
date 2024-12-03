import Order from "../models/order.model.js";
import response from "../utils/response.js";

const createOrderController = async (req, res) => {
  try {
    const { pid } = req.parmas;
    const { uid } = req.body;

    if (!pid) return response(res, 400, false, "No pid. No order");
    if (!uid) return response(res, 400, false, "No uid. No order");

    const order = await new Order({
      product: pid,
      customer: uid,
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
    const { status } = req.params;
    if (!oid) return response(res, 400, false, "No oid. No order updation");

    const updatedOrder = await Order.findByIdAndUpdate(
      oid,
      { status },
      { new: true }
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
    const limit = 20;
    const skip = (currentPageNo - 1) * limit;

    const orders = await Order.find().skip(skip).limit(limit);
    const totalOrdersCount = await Order.countDocuments();
    const totalPagesCount = totalOrdersCount / limit;

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

    const order = await Order.findById(oid);

    if (!order) return response(res, 404, false, "No order found");

    return response(res, 200, true, "Order fetched", order);
  } catch (err) {
    console.error(err.message);
  }
};

export {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  fetchAllOrdersController,
  fetchOrderController,
};
