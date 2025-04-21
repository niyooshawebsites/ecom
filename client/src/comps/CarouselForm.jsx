import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";

const CarouselForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchProductText, setSearchProductText] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [hideAjaxResults, setHideAjaxResults] = useState(false);
  const [carouselType, setCarouselType] = useState(null);

  const selectProduct = (value) => {
    setProduct(value);
  };

  const ajaxProductSearchText = async (e) => {
    setHideAjaxResults(false);

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

  const setVisibilityOfAjaxResults = () => {
    setHideAjaxResults(true);
  };

  const handleChange = async (e) => {
    const carousel = e.target.value;
    setCarouselType(carousel);
  };

  const createCarouselItem = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/create-products-carousel`,
        { carouselType, pid: productId },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setProduct("");
        setSearchProductText("");
        setCarouselType(null);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
                <label htmlFor="carouselType" className="mb-1">
                  Carousel Type
                </label>
                <select
                  name="carouselType"
                  id="carouselType"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  onChange={handleChange}
                  required
                >
                  <option>Select</option>
                  <option value="featured">Featured</option>
                  <option value="sale">Sale</option>
                  <option value="top sellers">Top sellers</option>
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-1">
                  Product selected
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product}
                  onChange={setVisibilityOfAjaxResults}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="No products selected"
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-1">
                  Search Product
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={ajaxProductSearchText}
                  value={searchProductText}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Enter product name"
                />

                <div className={hideAjaxResults ? `hidden` : ""}>
                  {searchedProducts.length > 0 && searchProductText ? (
                    <div className="absolute w-2/6 mt-2 bg-yellow-500">
                      <ul>
                        {searchedProducts.map((product) => (
                          <li
                            className="hover:bg-cyan-500 cursor-pointer p-2"
                            key={product._id}
                            onClick={() => {
                              selectProduct(product.name);
                              setHideAjaxResults(true);
                              setSearchProductText("");
                              setProductId(product._id);
                            }}
                          >
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

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
