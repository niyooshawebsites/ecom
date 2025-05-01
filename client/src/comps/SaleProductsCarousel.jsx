import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const SaleProductsCarousel = ({ saleProducts }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
      autoplay={{ delay: 2500 }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 }, // Mobile
        768: { slidesPerView: 2 }, // Tablet
        1024: { slidesPerView: 4 }, // Desktop
      }}
      className="w-full"
    >
      {saleProducts.map((sp) => (
        <SwiperSlide key={sp.product._id} className="p-4">
          <Link to={`product?pid=${sp.product._id}`}>
            <div className="border rounded-lg p-2 shadow-lg h-96 m-auto flex flex-col items-center">
              <img
                src={sp.product.img}
                alt={sp.product.name}
                className="inline-block h-72 rounded-md"
              />
              <h3 className="text-center mt-2">{sp.product.name}</h3>
              <p className="text-center font-semibold text-red-500">
                Rs {sp.product.price}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SaleProductsCarousel;
