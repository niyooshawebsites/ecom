import Layout from "../comps/Layout";
import CreateCategoryForm from "../comps/CreateCategoryForm";
import AdminSidebar from "../comps/AdminSidebar";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CreateCategoryForm />
      </div>
    </Layout>
  );
};

export default CreateCategory;
