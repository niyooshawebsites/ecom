import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import CustomFooterForm from "../comps/CustomFooterForm";

const CustomFooter = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CustomFooterForm />
      </div>
    </Layout>
  );
};

export default CustomFooter;
