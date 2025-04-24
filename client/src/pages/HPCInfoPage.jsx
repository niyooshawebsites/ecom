import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import CarouselInfo from "../comps/CarouselInfo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const HPCInfoPage = () => {
  const [deleteCarouselProduct, setDeleteCarouselProduct] = useState(false);
  const location = useLocation();
  const hpc = new URLSearchParams(location.search).get("hpc");

  useEffect(() => {}, [deleteCarouselProduct]);

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <CarouselInfo
          dataType={hpc}
          setDeleteCarouselProduct={setDeleteCarouselProduct}
        />
      </div>
    </Layout>
  );
};

export default HPCInfoPage;
