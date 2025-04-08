import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";

const CarouselForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchProductText, setSearchProductText] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const createCarouselItem = async () => {};
  const handleChange = async () => {};

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">
            Product carousel
          </h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form className="mb-3" action={createCarouselItem}>
              <div className="flex flex-col mb-3">
                <label htmlFor="discountType" className="mb-1">
                  Carousel Type
                </label>
                <select
                  name="discountType"
                  id="discountType"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  onChange={handleChange}
                  required
                >
                  <option>Select</option>
                  <option value="percentage">Featured</option>
                  <option value="percentage">Sales</option>
                  <option value="fixed">Top sellers</option>
                </select>
                {errors.discountType && (
                  <p className="text-red-500">
                    {errors.discountType._errors[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Create carousel Item
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CarouselForm;
