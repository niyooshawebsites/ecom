import AdminSidebar from "../comps/AdminSidebar";
import Layout from "../comps/Layout";
import UpdateProductForm from "../comps/UpdateProductForm";

const UpdateProduct = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UpdateProductForm />
      </div>
    </Layout>
  );
};

export default UpdateProduct;
