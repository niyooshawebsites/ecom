import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import { ImCross } from "react-icons/im";

const ImageSliderForm = () => {
  const [hideAjaxResults, setHideAjaxResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchProductText, setSearchProductText] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [sliderImage, setSliderImage] = useState({
    img: "",
    category: null,
    product: null,
    title: "",
    desc: "",
    btnText: "",
  });

  const [previewImg, setPreviewImg] = useState(null);

  // handle image field changes...
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setSliderImage((prev) => ({ ...prev, img: file }));

    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSliderImage((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createSliderItem = async (e) => {
    e.preventDefault(); // prevent default form submit behavior

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", sliderImage.img); // key should match multer's expectation
      formData.append("category", sliderImage.category);
      formData.append("product", sliderImage.product);
      formData.append("title", sliderImage.title);
      formData.append("desc", sliderImage.desc);
      formData.append("btnText", sliderImage.btnText);

      const res = await axios.post(
        `http://localhost:8000/api/v1/create-slider-item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setLoading(false);
        setSliderImage(null);
        setPreviewImg(null);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategories(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

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

  const selectProduct = (value) => {
    setProduct(value);
  };

  const setVisibilityOfAjaxResults = () => {
    setHideAjaxResults(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Image Slider</h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form
              className="mb-3"
              onSubmit={createSliderItem}
              encType="multipart/form-data"
            >
              <div className="flex flex-col mb-3">
                <label htmlFor="img" className="mb-2">
                  Slide Image
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={handleImgChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                />
                {previewImg && (
                  <div className="flex my-1">
                    <ModalImage
                      small={previewImg}
                      large={previewImg}
                      alt="Preview"
                      className="w-[80px] mr-2 rounded-md"
                    />
                    <ImCross
                      className="hover:cursor-pointer hover:text-3xl  text-orange-500 text-2xl border border-orange-600 rounded-full p-1"
                      onClick={() => {
                        setPreviewImg(null);
                      }}
                    />
                  </div>
                )}
                {errors.img && (
                  <p className="text-red-500">{errors.img._errors[0]}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="category" className="mb-2">
                  Select category
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="category"
                  id="category"
                  value={sliderImage.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500">{errors.category._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-1">
                  Product selected
                </label>
                <input
                  type="text"
                  name="product"
                  id="product"
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
                            className="hover:bg-cyan-500 cursor-pointer p-2 border"
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

              <div className="flex flex-col mb-3">
                <label htmlFor="title" className="mb-2">
                  Slide Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                />
                {errors.img && (
                  <p className="text-red-500">{errors.img._errors[0]}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="desc" className="mb-2">
                  Slide Description
                </label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                />
                {errors.img && (
                  <p className="text-red-500">{errors.img._errors[0]}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="btnText" className="mb-2">
                  Slide Button Text
                </label>
                <input
                  type="text"
                  name="btnText"
                  id="btnText"
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                />
                {errors.img && (
                  <p className="text-red-500">{errors.img._errors[0]}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Create slide
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSliderForm;
