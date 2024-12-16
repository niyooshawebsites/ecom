import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminOrdersTable = () => {
  const [adminOrders, setAdminOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-orders`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAdminOrders(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = async (formData) => {
    try {
      const oid = formData.get("oid");
      const status = formData.get("status");
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-order/${oid}`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (oid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-order/${oid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-center items-center min-h-screen">
      <div className="w-2/12">
        <h1 className="text-4xl py-3 poppins-regular">All Orders</h1>
        <table className="w-full border border-orange-600">
          <thead className="bg-blue-500 h-10 m-10">
            <tr className="border border-red-500">
              <th>#</th>
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Quantity</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Order Status</th>
              <th>Payment Method</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order, index) => {
              return (
                <tr
                  key={order._id}
                  className="odd:bg-white even:bg-gray-300 h-10"
                >
                  <td>{index + 1}</td>
                  <td>{order.product?.name}</td>
                  <td>
                    <img src={order.product?.img} alt={order.product?.name} />
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.product?.price}</td>
                  <td>{order.category?.name}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <form action={updateOrder()}>
                      <input type="text" name="oid" defaultValue={order._id} />
                      <select name="status" id="status">
                        <option value="On hold">On hold</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Cancelled & Refunded">
                          Cancelled & Refunded
                        </option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
                      >
                        Update Order
                      </button>
                    </form>
                    <Link to={`/order-details?oid=${order._id}`}>
                      <span className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700">
                        View
                      </span>
                    </Link>
                    <button
                      className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
                      onClick={deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
