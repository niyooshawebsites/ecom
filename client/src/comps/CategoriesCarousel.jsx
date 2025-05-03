import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const CategoriesCarousel = ({ categories }) => {
  const [bgColor, setBgColor] = useState("");

  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    setBgColor(rgb);
  };

  useEffect(() => {
    randomRGB();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
      autoplay={{ delay: 2500 }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 }, // mobile
        768: { slidesPerView: 2 }, // tablet
        1024: { slidesPerView: 5 }, // Desktop
      }}
      className="w-full"
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id} className="p-4">
          <Link to={`category?cid=${category._id}`}>
            <div
              className={`border rounded-full p-2 shadow-lg w-80 h-80 m-auto flex flex-col justify-center items-center hover:border-gray-950`}
              style={{ backgroundColor: bgColor }}
            >
              <h3 className="text-3xl text-center mt-2 text-white">
                {category.name}
              </h3>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesCarousel;
