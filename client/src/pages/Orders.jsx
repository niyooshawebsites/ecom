import Layout from "../comps/Layout";
import OrdersTable from "../comps/OrdersTable";
import AdminSidebar from "../comps/AdminSidebar";

const Orders = () => {
  return (
    <Layout>
      <main className="flex">
        <AdminSidebar />
        <OrdersTable />
      </main>
    </Layout>
  );
};

export default Orders;
