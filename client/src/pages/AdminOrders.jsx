import Layout from "../comps/Layout";
import AdminOrdersTable from "../comps/AdminOrdersTable";
import AdminSidebar from "../comps/AdminSidebar";

const AdminOrders = () => {
  return (
    <Layout>
      <main className="flex">
        <AdminSidebar />
        <AdminOrdersTable />
      </main>
    </Layout>
  );
};

export default AdminOrders;
