import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import UpdateTaxForm from "../comps/UpdateTaxForm";

const UpdateTax = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UpdateTaxForm />
      </div>
    </Layout>
  );
};

export default UpdateTax;
