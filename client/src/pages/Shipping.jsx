import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import ShippingForm from "../comps/ShippingForm";

const Shipping = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ShippingForm />
      </div>
    </Layout>
  );
};

export default Shipping;
