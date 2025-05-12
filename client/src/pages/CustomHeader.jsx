import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import CustomHeaderForm from "../comps/CustomHeaderForm";

const CustomHeader = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CustomHeaderForm />
      </div>
    </Layout>
  );
};

export default CustomHeader;
