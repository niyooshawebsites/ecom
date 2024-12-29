import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import UpdateCouponForm from "../comps/UpdateCouponForm";

const UpdateCoupon = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UpdateCouponForm />
      </div>
    </Layout>
  );
};

export default UpdateCoupon;
