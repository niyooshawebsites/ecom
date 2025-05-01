import { useState, useEffect } from "react";
import ImageSlider from "../comps/ImageSlider";
import FeaturedProductsCarousel from "../comps/FeaturedProductsCarousel";
import SaleProductsCarousel from "../comps/SaleProductsCarousel";
import TopSellerProductsCarousel from "../comps/TopSellerProductsCarousel";
import axios from "axios";
import Layout from "../comps/Layout";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [topSellerProducts, setTopSellerProducts] = useState([]);

  const fetchAllCarouselProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-carousel-products`,
        { withCredentials: true }
      );

      console.log("API being called");
      console.log(res);
      console.log(res.data.data);

      if (res.data.success) {
        setFeaturedProducts(
          res.data.data.filter((item) => item.carouselType === "featured")
        );
        setSaleProducts(
          res.data.data.filter((item) => item.carouselType === "sale")
        );
        setTopSellerProducts(
          res.data.data.filter((item) => item.carouselType === "top sellers")
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllCarouselProducts();
  }, []);

  console.log(featuredProducts);

  return (
    <>
      <Layout>
        <ImageSlider />
        <h1 className="text-center text-3xl py-10">FEATURED</h1>
        <FeaturedProductsCarousel featuredProducts={featuredProducts} />
        <h1 className="text-center text-3xl py-10">SALE</h1>
        <SaleProductsCarousel saleProducts={saleProducts} />
        <h1 className="text-center text-3xl py-10">TOP SELLERS</h1>
        <TopSellerProductsCarousel topSellerProducts={topSellerProducts} />
      </Layout>
    </>
  );
};

export default Home;
