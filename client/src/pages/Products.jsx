import Layout from "../comps/Layout";
import ProductsTable from "../comps/ProductsTable";
import AdminSidebar from "../comps/AdminSidebar";

const Products = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ProductsTable />
      </div>
    </Layout>
  );
};

export default Products;
