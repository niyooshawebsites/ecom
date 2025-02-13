import DisplayGallery from "../comps/DisplayGallery";
import AdminSidebar from "../comps/AdminSidebar";
import Layout from "../comps/Layout";

const Gallery = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <DisplayGallery />
      </div>
    </Layout>
  );
};

export default Gallery;
