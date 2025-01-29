import Layout from "../comps/Layout";
import UsersTable from "../comps/UsersTable";
import AdminSidebar from "../comps/AdminSidebar";

const Users = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UsersTable />
      </div>
    </Layout>
  );
};

export default Users;
