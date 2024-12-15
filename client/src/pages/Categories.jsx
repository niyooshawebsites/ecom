import Layout from "../comps/Layout";
import CategoriesTable from "../comps/CategoriesTable";
import AdminSidebar from "../comps/AdminSidebar";

const Categories = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CategoriesTable />
      </div>
    </Layout>
  );
};

export default Categories;
