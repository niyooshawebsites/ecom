import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const AdminOrderDetails = () => {
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState("");
  const location = useLocation();

  const queryString = new URLSearchParams(location.search);

  const oid = queryString.get("oid");

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-order/${oid}`,
        { withCredentials: true }
      );

      console.log(res);

      if (res.data.success) {
        setOrder(res.data.data);
        setAddress(
          `${order.customer?.customerDetails?.address?.buildingNo}, ${order.customer?.customerDetails?.address?.streetNo}, ${order.customer?.customerDetails?.address?.buildingNo}, ${order.customer?.customerDetails?.address?.locality}, ${order.customer?.customerDetails?.address?.district}, ${order.customer?.customerDetails?.address?.city}, ${order.customer?.customerDetails?.address?.state}, ${order.customer?.customerDetails?.address?.pincode}`
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchOrder(oid);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <div className="w-10/12 flex justify-end items-end mt-5">
        <Link
          className="bg-blue-600 px-2 py-1 hover:bg-blue-700 text-white rounded-md"
          to="/dashboard/orders"
        >
          Back
        </Link>
      </div>

      <div className="flex">
        <div>
          <h1 className="text-4xl py-3 poppins-regular my-5">Order details</h1>
          <div className="flex border rounded-lg p-5 bg-gray-100">
            <div>
              <img
                src={order.product?.img}
                alt={order.product?.name}
                style={{ width: "120px" }}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col p-5">
              <p className="text-xl mb-2">
                <span className="font-semibold">Product ID: </span>
                {order.product?._id}
              </p>
              <p className="text-xl mb-2">
                <span className="font-semibold">Product name: </span>
                {order.product?.name}
              </p>
              <p className="text-xl mb-2">
                <span className="font-semibold">Price: </span>
                {order.product?.price}
              </p>
              <p className="text-xl">
                <span className="font-semibold">Quantity: </span>{" "}
                {order.quantity}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl py-3 poppins-regular my-5">
            Contact details
          </h1>
          <div className="flex border rounded-lg p-5 bg-gray-100">
            <div>
              <h1>Basic Info</h1>
              <p className="text-xl mb-2">
                <span className="font-semibold">First name: </span>
                {order.customer?.customerDetails?.fName || "N/A"}
              </p>
              <p className="text-xl mb-2">
                <span className="font-semibold">Last name: </span>
                {order.customer?.customerDetails?.lName || "N/A"}
              </p>
              <p className="text-xl mb-2">
                <span className="font-semibold">Email: </span>
                {order.customer?.email || "N/A"}
              </p>
              <p className="text-xl">
                <span className="font-semibold">Phone: </span>{" "}
                {order.customer?.customerDetails?.contactNo || "N/A"}
              </p>
            </div>
            <div className="flex flex-col p-5">
              <h1>Address:</h1>
              <p className="text-xl mb-2">{address || "N/A"}</p>
              <h1>Landmark: </h1>
              <p>
                {order.customer?.customerDetails?.address?.buildingNo || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
