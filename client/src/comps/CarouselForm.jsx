import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";

const CarouselForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchProductText, setSearchProductText] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const ajaxProductSearchText = async (e) => {
    try {
      setSearchProductText(e.target.value);

      const res = await axios.get(
        `http://localhost:8000/api/v1/ajax-product-search/${e.target.value}`
      );

      if (res.data.success) {
        setSearchedProducts(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
<<<<<<< HEAD
                  <option value="percentage">Featured</option>
                  <option value="percentage">Sales</option>
                  <option value="fixed">Top sellers</option>
=======
                  <option value="featured">Featured</option>
                  <option value="sale">Sale</option>
                  <option value="top sellers">Top sellers</option>
>>>>>>> 6c2a6eedf537803adadfa8ede72db43fc86c5223
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-1">
                  Product
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={ajaxProductSearchText}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Enter product name"
                  required
                />

                {searchedProducts.length > 0 && searchProductText ? (
                  <div className="absolute w-full mt-2 bg-yellow-500">
                    <ul>
                      {searchedProducts.map((product) => (
                        <li className="hover:bg-cyan-500" key={product._id}>
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                {errors.name && (
                  <p className="text-red-500">{errors.name._errors[0]}</p>
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
