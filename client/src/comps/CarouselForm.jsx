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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Create category</h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form className="mb-3" action={createCarouselItem}>
              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-3">
                  Carousel type
                </label>

                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="carouselType"
                  id="carouselType"
                  required
                >
                  <option>Select</option>
                  <option value="featured">Featured</option>
                  <option value="sale">Sale</option>
                  <option value="top-seller">Top seller</option>
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-2">
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name._errors[0]}</p>
                )}

                <div className="absolute w-full mt-2 bg-yellow-500">
                  <ul>
                    {searchedProducts.map((product) => (
                      <li key={product._id} className="hover:bg-cyan-500">
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Create Carousel Item
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CarouselForm;
