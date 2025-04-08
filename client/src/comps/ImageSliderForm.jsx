import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import { ImCross } from "react-icons/im";

const ImageSliderForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sliderImage, setSliderImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // handle image field changes...
  const handleImgChange = (e) => {
    const file = e.targe.files[0];
    setSliderImage((prev) => ({ ...prev, img: file }));

    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const createSliderItem = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/create-slide`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
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
          <h1 className="text-4xl py-3 poppins-light my-10">Image Slider</h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form
              className="mb-3"
              action={createSliderItem}
              encType="multipart/form-data"
            >
              <div className="flex flex-col mb-3">
                <label htmlFor="img" className="mb-2">
                  Select an image
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

              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Add a slide
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSliderForm;
