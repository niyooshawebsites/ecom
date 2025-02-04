import Layout from "../comps/Layout";
import PaymentSuccessMsg from "../comps/PaymentSuccessMsg";

const PaymentSuccess = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <PaymentSuccessMsg />
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
