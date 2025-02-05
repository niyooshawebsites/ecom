import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { paymentMethodSliceActions } from "../store/slices/paymentMethodSlice";

const PaymentSuccessMsg = () => {
  const dispatch = useDispatch();
  const { online } = useSelector((state) => state.payment_Method_Slice);

  const goToLoginPage = () => {
    dispatch(
      paymentMethodSliceActions.populatePaymentStatus({
        online: false,
        offline: false,
      })
    );
  };

  if (!online) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-gray-200 p-10 text-center rounded-lg">
        <h1 className="text-green-600 text-2xl mb-3">Payment successful</h1>
        <h2 className="text-xl mb-2">
          Thank you for placing your order with us
        </h2>
        <p className="mb-4">Lonin to check your order details</p>
        <Link
          className="bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 rounded"
          onClick={goToLoginPage}
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessMsg;
