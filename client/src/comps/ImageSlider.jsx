import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core swiper slides
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";

const ImageSlider = () => {
  const [slides, setSlides] = useState([]);

  const fetchAllImageSlides = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-image-slides`
      );

      if (res.data.success) {
        setSlides(res.data.sliderItemsWithImageURLs);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllImageSlides();
  }, []);

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
      {slides.map((slide) => {
        return (
          <SwiperSlide key={slide._id}>
            <img
              src={slide.img}
              alt={slide.img}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
