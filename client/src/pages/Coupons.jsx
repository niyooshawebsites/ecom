import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import CouponsTable from "../comps/CouponsTable";

const Coupons = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CouponsTable />
      </div>
    </Layout>
  );
};

export default Coupons;
