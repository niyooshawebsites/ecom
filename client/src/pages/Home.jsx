import { useState, useEffect } from "react";
import ImageSlider from "../comps/ImageSlider";
import FeaturedProductsCarousel from "../comps/FeaturedProductsCarousel";
import SaleProductsCarousel from "../comps/SaleProductsCarousel";
import TopSellerProductsCarousel from "../comps/TopSellerProductsCarousel";
import CategoriesCarousel from "../comps/CategoriesCarousel";
import axios from "axios";
import Layout from "../comps/Layout";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [topSellerProducts, setTopSellerProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`
      );

      if (res.data.success) {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAllCarouselProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-carousel-products`,
        { withCredentials: true }
      );

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
    fetchAllCategories();
    fetchAllCarouselProducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="bg-gray-100">
          <ImageSlider />
          <h1 className="text-center text-3xl py-10">CATEGORIES</h1>
          <CategoriesCarousel categories={categories} />
          <h1 className="text-center text-3xl py-10">FEATURED</h1>
          <FeaturedProductsCarousel featuredProducts={featuredProducts} />
          <h1 className="text-center text-3xl py-10">SALE</h1>
          <SaleProductsCarousel saleProducts={saleProducts} />
          <h1 className="text-center text-3xl py-10">TOP SELLERS</h1>
          <TopSellerProductsCarousel topSellerProducts={topSellerProducts} />
        </div>
      </Layout>
    </>
  );
};

export default Home;
