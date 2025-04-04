import CarouselForm from "../comps/CarouselForm";
import AdminSidebar from "../comps/AdminSidebar";
import Layout from "../comps/Layout";

const ProductCarouselPage = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CarouselForm />
      </div>
    </Layout>
  );
};

export default ProductCarouselPage;
