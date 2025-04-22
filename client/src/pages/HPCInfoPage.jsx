import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import CarouselInfo from "../comps/CarouselInfo";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";

const HPCInfoPage = () => {
  const location = useLocation();
  const hpc = new URLSearchParams(location.search).get("hpc");

  const [carouselData, setCarouselData] = useState([]);

  const fetchAllCarsoulselData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-carousel-products`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCarouselData(res.data.data);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // const deleteCaouselData = () => {};

  // const handleCheckboxChange = () => {};

  // const deleteMultiple = () => {};

  // const checkEveryCheckbox = () => {};

  useEffect(() => {
    fetchAllCarsoulselData();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        {hpc === "featured-carousel" ||
        hpc === "sale-carousel" ||
        hpc === "top-seller-carousel" ? (
          <CarouselInfo carouselData={carouselData} />
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default HPCInfoPage;
