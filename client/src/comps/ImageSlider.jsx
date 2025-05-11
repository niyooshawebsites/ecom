import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core swiper slides
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sortSliceActions } from "../store/slices/sortSlice";
import { filterSliceActions } from "../store/slices/filterSlice";

const ImageSlider = () => {
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([]);

  const fetchAllImageSlides = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-image-slides`
      );

      console.log(res);

      if (res.data.success) {
        setSlides(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fiterByCategory = (cid, cName) => {
    try {
      dispatch(
        sortSliceActions.populateSortBasis({
          sortBasis: null,
        })
      );

      dispatch(
        filterSliceActions.populateActiveFilterId({
          activeFilterId: cid,
        })
      );

      dispatch(
        filterSliceActions.populateFilteredCategory({
          filteredCategory: cName,
        })
      );
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
      className="w-full h-[800px]"
    >
      {slides.map((slide) => {
        return (
          <SwiperSlide key={slide._id}>
            <img
              src={slide.img}
              alt={slide.img}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-6">{slide.desc}</p>
              <Link
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
                to={slide.btnLink}
                onClick={() => fiterByCategory(category._id, category.name)}
              >
                {slide.btnText}
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
