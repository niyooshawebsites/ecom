import UpdateCategoryForm from "../comps/UpdateCategoryForm";
import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";

const UpdateCategory = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <UpdateCategoryForm />
      </div>
    </Layout>
  );
};

export default UpdateCategory;
