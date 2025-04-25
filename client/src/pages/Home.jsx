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

      console.log(res);

      if (res.data.success) {
        setFeaturedProducts(
          res.data.data.filter((item) => item.carouselType === "featured")
        );
        setSaleProducts(
          res.data.data.filter((item) => item.carouselType === "sale")
        );
        setTopSellerProducts(
          res.data.data.filter((item) => item.carouselType === "top-seller")
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
        <h1 className="text-center text-2xl py-3">Featured products</h1>
        <FeaturedProductsCarousel featuredProducts={featuredProducts} />
        <h1 className="text-center text-2xl py-3">Sale products</h1>
        <SaleProductsCarousel saleProducts={saleProducts} />
        <h1 className="text-center text-2xl py-3">Top sellers</h1>
        <TopSellerProductsCarousel topSellerProducts={topSellerProducts} />
      </Layout>
    </>
  );
};

export default Home;
