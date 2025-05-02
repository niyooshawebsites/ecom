import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import { ImCross } from "react-icons/im";

const ImageSliderForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sliderImage, setSliderImage] = useState({
    img: "",
    title: "",
    desc: "",
    btnText: "",
    btnLink: "",
  });
  const [previewImg, setPreviewImg] = useState(null);

  // handle image field changes...
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setSliderImage((prev) => ({ ...prev, img: file }));

    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const createSliderItem = async (e) => {
    e.preventDefault(); // prevent default form submit behavior

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", sliderImage.img); // key should match multer's expectation
      formData.append("title", sliderImage.title);
      formData.append("desc", sliderImage.desc);
      formData.append("btnText", sliderImage.btnText);
      formData.append("btnLink", sliderImage.btnLink);

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
                <label htmlFor="title" className="mb-2">
                  Slide Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleImgChange}
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
                  onChange={handleImgChange}
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
                  onChange={handleImgChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                />
                {errors.img && (
                  <p className="text-red-500">{errors.img._errors[0]}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="btnLink" className="mb-2">
                  Slide Button Link
                </label>
                <input
                  type="text"
                  name="btnLink"
                  id="btnLink"
                  onChange={handleImgChange}
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
