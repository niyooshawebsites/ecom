import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const TopSellerProductsCarousel = ({ topSellerProducts }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={10}
      slidesPerView={5}
      navigation
      autoplay={{ delay: 2500 }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 }, // Mobile
        768: { slidesPerView: 2 }, // Tablet
        1024: { slidesPerView: 5 }, // Desktop
      }}
      className="w-full"
    >
      {topSellerProducts.map((tsp) => (
        <SwiperSlide key={tsp.product._id} className="p-4">
          <Link to={`product?pid=${tsp.product._id}`}>
            <div className="border rounded-lg p-2 shadow-lg w-80 h-80 m-auto flex flex-col items-center">
              <img
                src={tsp.product.img}
                alt={tsp.product.name}
                className="inline-block h-64 rounded-md"
              />
              <h3 className="text-center mt-2">{tsp.product.name}</h3>
              <p className="text-center font-semibold text-red-500">
                ${tsp.product.price}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopSellerProductsCarousel;
