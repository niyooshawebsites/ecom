import Layout from "../comps/Layout";
import OrderConfimationMsg from "../comps/OrderConfimationMsg";

const OrderConfirmation = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <OrderConfimationMsg />
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
