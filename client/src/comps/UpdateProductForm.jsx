import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackBtn from "./BackBtn";
import Loading from "./Loading";
import productSchema from "../utils/validation/productSchema";
import { ImCross } from "react-icons/im";
import ModalImage from "react-modal-image";

const UpdateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    slug: "",
    category: "",
    shortDesc: "",
    longDesc: "",
    img: null,
    gallery: [],
  });
  const [categories, setCategories] = useState([]);
  const [productUpdated, setProductUpdated] = useState(false);
  const { pid } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [previewImg, setPreviewImg] = useState(null);
  const [previewGalleryImgs, setPreviewGalleryImgs] = useState(null);

  // hadle text field changes...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, img: file }));

    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({ ...prev, gallery: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewGalleryImgs(previews);
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

  const fetchProduct = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProduct((prev) => ({
          ...prev,
          name: res.data.data.name,
          price: res.data.data.price,
          slug: res.data.data.slug,
          category: res.data.data.category._id,
          shortDesc: res.data.data.shortDesc,
          longDesc: res.data.data.longDesc,
          img: res.data.data.img,
          gallery: res.data.data.gallery.map((entry) => entry.value),
        }));
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    // Validate using Zod
    const result = productSchema.safeParse({
      ...product,
      price: Number(product.price),
    });

    if (result.success) {
      setLoading(true);
    }

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors); // Store errors in state
      setLoading(false);
      console.log("failed");
      return;
    }

    try {
      const productData = new FormData();

      productData.append("category", product.category);
      productData.append("name", product.name);
      productData.append("price", product.price);
      productData.append("img", product.img);
      productData.append("shortDesc", product.shortDesc);
      productData.append("longDesc", product.longDesc);

      // Append each gallery image
      product.gallery.forEach((file) => {
        productData.append("gallery", file);
      });

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-product/${pid}`,
        productData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);

        setProductUpdated((prev) => !prev);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchProduct();
  }, [productUpdated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <BackBtn link={"/dashboard/products"} />
          <h1 className="text-4xl py-3 poppins-light mb-5">Update Product</h1>
          <div className="flex flex-col w-6/12 border rounded-lg p-5 mb-10">
            <form className="mb-3" onSubmit={updateProduct}>
              <div className="flex flex-col mb-3">
                <label htmlFor="username">Select category</label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="category"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="currentCategory" className="text-gray-400">
                  Current category
                </label>
                <input
                  type="text"
                  name="currentCategory"
                  id="currentCategory"
                  defaultValue={
                    categories.filter(
                      (category) => category._id === product.category
                    )[0]?.name
                  }
                  className="border rounded-lg py-2 px-2 outline-none bg-gray-100 text-gray-400"
                  placeholder="Current category"
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="username">Product name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={product.name}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product name"
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={product.price}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product Price"
                  onChange={handleChange}
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
                {(previewImg || product.img) && (
                  <div className="flex my-1">
                    <ModalImage
                      small={previewImg || product.img}
                      large={previewImg || product.img}
                      alt="Preview"
                      className="w-[80px] mr-2 rounded-md"
                    />
                    <ImCross
                      className="hover:cursor-pointer hover:text-3xl  text-orange-500 text-2xl border border-orange-600 rounded-full p-1"
                      onClick={() => {
                        setPreviewImg(null);
                        setProduct((prev) => ({ ...prev, img: null }));
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
                <div className="flex my-2">
                  {(previewGalleryImgs &&
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
                            setProduct((prev) => ({
                              ...prev,
                              gallery: [],
                            }));
                          }}
                        />
                      </div>
                    ))) ||
                    (product.gallery.length > 0 &&
                      product.gallery.map((src, index) => (
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
                              setProduct((prev) => ({
                                ...prev,
                                gallery: [],
                              }));
                            }}
                          />
                        </div>
                      )))}
                </div>
                {errors.gallery && (
                  <p className="text-red-500">{errors.gallery._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="shortDesc">Short Description</label>
                <textarea
                  name="shortDesc"
                  id="shortDesc"
                  rows={4}
                  defaultValue={product.shortDesc}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product short description"
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.shortDesc && (
                  <p className="text-red-500">{errors.shortDesc._errors[0]}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="longDesc">Long Description</label>
                <textarea
                  name="longDesc"
                  id="longDesc"
                  defaultValue={product.longDesc}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  rows={10}
                  placeholder="Product short description"
                  onChange={handleChange}
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
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProductForm;
