import AdminSidebar from "../comps/AdminSidebar";
import CreateCouponForm from "../comps/CreateCouponForm";
import Layout from "../comps/Layout";

const CreateCoupon = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CreateCouponForm />
      </div>
    </Layout>
  );
};

export default CreateCoupon;
