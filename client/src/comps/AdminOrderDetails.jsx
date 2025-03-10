import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BackBtn from "./BackBtn";
import Loading from "./Loading";

const AdminOrderDetails = () => {
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState(``);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const queryString = new URLSearchParams(location.search);

  const oid = queryString.get("oid");

  const fetchOrder = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-order/${oid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrder(res.data.data);
        setAddress(
          `${res.data.data.customer?.contactDetails?.address?.buildingNo}, ${res.data.data.customer?.contactDetails?.address?.streetNo}, ${res.data.data.customer?.contactDetails?.address?.locality}, ${res.data.data.customer?.contactDetails?.address?.district}, ${res.data.data.customer?.contactDetails?.address?.city}, ${res.data.data.customer?.contactDetails?.address?.state} - ${res.data.data.customer?.contactDetails?.address?.pincode}`
        );
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(oid);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col justify-start items-center min-h-screen">
          <BackBtn link={"/dashboard/orders"} />

          <div className="flex flex-col">
            <div className="w-full m-1">
              <div className="flex justify-center items-center border rounded-lg p-2 bg-gray-100">
                <div>
                  <img
                    src={order.product?.img}
                    alt={order.product?.name}
                    style={{ width: "140px" }}
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col px-5">
                  <h1 className="text-2xl poppins-regular mb-2 text-orange-600">
                    Order details
                  </h1>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Product ID: </span>
                    {order.product?._id}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Product name: </span>
                    {order.product?.name}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Price: </span>
                    {order.product?.price}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Quantity: </span>{" "}
                    {order.quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full m-1">
              <div className="flex flex-col border rounded-lg px-5 bg-gray-100">
                <div>
                  <h1 className="text-2xl py-3 poppins-regular text-orange-600">
                    Contact details
                  </h1>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">First name: </span>
                    {order.customer?.contactDetails?.fName || "N/A"}
                    {console.log(JSON.stringify(order))}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Last name: </span>
                    {order.customer?.contactDetails?.lName || "N/A"}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Email: </span>
                    {order.customer?.email || "N/A"}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Phone: </span>
                    {order.customer?.contactDetails?.contactNo || "N/A"}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Landmark: </span>
                    {order.customer?.contactDetails?.address?.landmark || "N/A"}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Address: </span>
                    {address || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full m-1">
              <div className="flex flex-col border rounded-lg px-5 bg-gray-100">
                <div>
                  <h1 className="text-2xl py-3 poppins-regular text-orange-600">
                    Payment details
                  </h1>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Payment mode: </span>
                    {order.paymentMethod || "N/A"}
                    {console.log(JSON.stringify(order))}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Payment status: </span>
                    {order.paymentStatus || "N/A"}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Txn ID: </span>
                    {order.tnxId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderDetails;
