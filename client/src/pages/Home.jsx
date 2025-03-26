import { useState, useEffect } from "react";
import ImageSlider from "../comps/ImageSlider";
import ProductsCarousel from "../comps/ProductsCarousel";
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [topSellerProducts, setTopSellerProducts] = useState([]);

  const fetchAllCarouselProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-carousel-products`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setFeaturedProducts(
          res.data.carouselItems.map((item) => item.carouselType === "featured")
        );
        setSaleProducts(
          res.data.carouselItems.map((item) => item.carouselType === "sale")
        );
        setTopSellerProducts(
          res.data.carouselItems.map(
            (item) => item.carouselType === "top-seller"
          )
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllCarouselProducts();
  }, []);

  return (
    <>
      <ImageSlider />
      <h1>Featured products</h1>
      <ProductsCarousel products={featuredProducts} />
      <h1>Sale products</h1>
      <ProductsCarousel products={saleProducts} />
      <h1>Top sellers</h1>
      <ProductsCarousel products={topSellerProducts} />
    </>
  );
};

export default Home;
