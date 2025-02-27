import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import Loading from "./Loading";
import productSchema from "../utils/validation/productSchema";
import ModalImage from "react-modal-image";

const CreateProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    price: "",
    length: "",
    breadth: "",
    height: "",
    weight: "",
    shortDesc: "",
    longDesc: "",
    img: null,
    gallery: [],
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [previewGalleryImgs, setPreviewGalleryImgs] = useState(null);

  // hadle text field changes...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle img field changes...
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setProductDetails((prev) => ({ ...prev, img: file }));

    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  // handle gallery field changes...
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setProductDetails((prev) => ({ ...prev, gallery: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewGalleryImgs(previews);
  };

  const handleProductCreation = async (e) => {
    e.preventDefault();

    // Validate using Zod
    const result = productSchema.safeParse({
      ...productDetails,
      price: Number(productDetails.price),
    });

    if (result.success) {
      setLoading(true);
    }

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors); // Store errors in state
      setLoading(false);
      return;
    }

    try {
      const productData = new FormData();

      productData.append("category", productDetails.category);
      productData.append("name", productDetails.name);
      productData.append("price", productDetails.price);
      productData.append("length", productDetails.length);
      productData.append("breadth", productDetails.breadth);
      productData.append("height", productDetails.height);
      productData.append("weight", productDetails.weight);
      productData.append("img", productDetails.img);
      productData.append("shortDesc", productDetails.shortDesc);
      productData.append("longDesc", productDetails.longDesc);

      // Append each gallery image
      productDetails.gallery.forEach((file) => {
        productData.append("gallery", file);
      });

      const res = await axios.post(
        "http://localhost:8000/api/v1/create-product",
        productData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);

        setProductDetails({
          name: "",
          category: "",
          price: "",
          length: "",
          breadth: "",
          height: "",
          weight: "",
          shortDesc: "",
          longDesc: "",
          img: null,
          gallery: [],
        });

        setPreviewImg(null);
        setPreviewGalleryImgs(null);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
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

  useEffect(() => {
    fetchAllCategories();
  }, [productDetails.img]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Create Product</h1>
          <div className="flex flex-col w-6/12 border rounded-lg p-5">
            <form
              className="mb-3"
              onSubmit={handleProductCreation}
              encType="multipart/form-data"
            >
              <div className="flex flex-col mb-3">
                <label htmlFor="category" className="mb-2">
                  Select category
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="category"
                  id="category"
                  value={productDetails.category}
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
                <label htmlFor="name" className="mb-2">
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={productDetails.name}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="price" className="mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={productDetails.price}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product Price"
                  required
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="img" className="mb-2">
                  Product image
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={handleImgChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product name"
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
                <label htmlFor="gallery" className="mb-2">
                  Product Gallery
                </label>
                <input
                  type="file"
                  name="gallery"
                  id="gallery"
                  onChange={handleGalleryChange}
                  multiple
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product gallery"
                />
                <div className="flex">
                  {previewGalleryImgs &&
                    previewGalleryImgs.map((src, index) => (
                      <div className="flex my-1 mr-3" key={index}>
                        <ModalImage
                          small={src}
                          large={src}
                          alt="Preview"
                          className="w-[80px] mr-2 rounded-md"
                        />
                        <ImCross
                          className="hover:cursor-pointer hover:text-3xl  text-orange-500 text-2xl border border-orange-600 rounded-full p-1"
                          onClick={() => {
                            setPreviewGalleryImgs(null);
                          }}
                        />
                      </div>
                    ))}
                </div>
                {errors.gallery && (
                  <p className="text-red-500">{errors.gallery._errors[0]}</p>
                )}
              </div>

              <div className="flex">
                <div className="flex flex-col mb-3 w-6/12 mr-3">
                  <label htmlFor="discountType" className="mb-1">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length"
                    id="length"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={productDetails.length}
                    onChange={handleChange}
                  />
                  {errors.length && (
                    <p className="text-red-500">{errors.length._errors[0]}</p>
                  )}
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="currentDiscountType" className="mb-1">
                    Breadth (cm)
                  </label>
                  <input
                    type="number"
                    name="breadth"
                    id="breadth"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={productDetails.breadth}
                    onChange={handleChange}
                  />
                  {errors.breadth && (
                    <p className="text-red-500">{errors.breadth._errors[0]}</p>
                  )}
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col mb-3 w-6/12 mr-3">
                  <label htmlFor="height" className="mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={productDetails.height}
                    onChange={handleChange}
                  />
                  {errors.height && (
                    <p className="text-red-500">{errors.height._errors[0]}</p>
                  )}
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="weight" className="mb-1">
                    Weight (Kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={productDetails.weight}
                    onChange={handleChange}
                  />
                  {errors.weight && (
                    <p className="text-red-500">{errors.weight._errors[0]}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="shortDesc" className="mb-2">
                  Short Description
                </label>
                <textarea
                  name="shortDesc"
                  id="shortDesc"
                  value={productDetails.shortDesc}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product short description"
                  required
                ></textarea>
                {errors.shortDesc && (
                  <p className="text-red-500">{errors.shortDesc._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="longDesc" className="mb-2">
                  Long Description
                </label>
                <textarea
                  name="longDesc"
                  id="longDesc"
                  value={productDetails.longDesc}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  rows={8}
                  placeholder="Product short description"
                  required
                ></textarea>
                {errors.longDesc && (
                  <p className="text-red-500">{errors.longDesc._errors[0]}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductForm;
