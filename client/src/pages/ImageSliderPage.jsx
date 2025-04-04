import ImageSliderForm from "../comps/ImageSliderForm";
import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";

const ImageSliderPage = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ImageSliderForm />
      </div>
    </Layout>
  );
};

export default ImageSliderPage;
