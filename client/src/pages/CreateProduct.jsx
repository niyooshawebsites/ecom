import Layout from "../comps/Layout";
import CreateProductForm from "../comps/CreateProductForm";
import AdminSidebar from "../comps/AdminSidebar";

const CreateProduct = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CreateProductForm />
      </div>
    </Layout>
  );
};

export default CreateProduct;
