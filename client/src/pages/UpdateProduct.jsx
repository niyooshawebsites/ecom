import AdminSidebar from "../comps/AdminSidebar";
import Layout from "../comps/Layout";
import UpdateCategoryForm from "../comps/UpdateCategoryForm";

const UpdateProduct = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UpdateCategoryForm />
      </div>
    </Layout>
  );
};

export default UpdateProduct;
