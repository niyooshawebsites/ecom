import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const ProductsCarousel = ({ products }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
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
      {products.map((product) => (
        <SwiperSlide key={product._id} className="p-4">
          <div className="border rounded-lg p-2 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-center mt-2">{product.name}</h3>
            <p className="text-center font-semibold text-red-500">
              ${product.price}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCarousel;
