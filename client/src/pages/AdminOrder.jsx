import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import AdminOrderDetails from "../comps/AdminOrderDetails";

const AdminOrder = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <AdminOrderDetails />
      </div>
    </Layout>
  );
};

export default AdminOrder;
