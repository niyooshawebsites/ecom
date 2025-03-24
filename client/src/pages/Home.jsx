import ImageSlider from "../comps/ImageSlider";
import ProductsCarousel from "../comps/ProductsCarousel";

const Home = () => {
  return (
    <>
      <ImageSlider />
      <h1>Featured products</h1>
      <ProductsCarousel />
      <h1>Sale products</h1>
      <ProductsCarousel />
      <h1>Top sellers</h1>
      <ProductsCarousel />
    </>
  );
};

export default Home;
