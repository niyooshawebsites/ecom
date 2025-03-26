import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import ProductsCarousel from "../comps/ProductsCarousel";

const Homepage = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ProductsCarousel />
      </div>
    </Layout>
  );
};

export default Homepage;
