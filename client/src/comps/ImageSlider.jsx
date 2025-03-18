import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core swiper slides
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-[600px]"
    >
      <SwiperSlide>
        <img
          src="/images/banner1.jpg"
          alt="Banner 1"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/banner2.jpg"
          alt="Banner 2"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/banner3.jpg"
          alt="Banner 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
