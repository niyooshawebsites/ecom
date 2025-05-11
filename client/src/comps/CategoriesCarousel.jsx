import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { filterSliceActions } from "../store/slices/filterSlice";
import { sortSliceActions } from "../store/slices/sortSlice";

const CategoriesCarousel = ({ categories }) => {
  const [bgColor, setBgColor] = useState("");
  const dispatch = useDispatch();

  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    setBgColor(rgb);
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
          <Link
            to={`category?cid=${category._id}`}
            onClick={() => fiterByCategory(category._id, category.name)}
          >
            <div
              className={`border rounded-full p-2 shadow-lg w-72 h-72 m-auto flex flex-col justify-center items-center hover:border-gray-950`}
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
