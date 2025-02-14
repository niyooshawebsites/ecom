import { useState, useEffect } from "react";
import { SlRefresh } from "react-icons/sl";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import NoData from "./NoData";
import ModalImage from "react-modal-image";
import { ImCross } from "react-icons/im";

const DisplayGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [tempStorage, setTempStorage] = useState([]);
  const [imgUploaded, setImgUploaded] = useState(false);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setTempStorage(files);
  };

  const uplaodGalleryImages = async (e) => {
    e.preventDefault();

    const galleryData = new FormData();

    // append each image of the gallery
    tempStorage.forEach((file) => {
      galleryData.append("imgKeys", file);
    });

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload-gallery-images`,
        galleryData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setImgUploaded((prev) => !prev);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      console.log(err.message);
    }
  };

  const fetchAllGalleryImages = async (pageNo) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-gallery-images/${pageNo}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setGalleryImages(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-gallery-image/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllGalleryImages(1);
  }, [imgUploaded]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <div className="w-10/12">
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
            Gallery
          </h1>
          <button onClick={fetchAllGalleryImages} className="ml-5">
            <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
          </button>
        </div>
        <div className="flex my-5">
          <form
            onSubmit={uplaodGalleryImages}
            className="flex w-full"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="imgKeys"
              id="imgKeys"
              onChange={handleChange}
              multiple
              className="border border-gray-300 rounded p-1 mr-2 w-full"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Upload
            </button>
          </form>
        </div>
        {galleryImages.length > 0 ? (
          <div className="flex flex-reverse">
            {galleryImages.map((file) => (
              <div className="flex m-2" key={file.value._id}>
                <ModalImage
                  small={file.value?.url}
                  large={file.value?.url}
                  alt="Preview"
                  className="h-[100px] mr-2 rounded"
                />
                <ImCross
                  className="hover:cursor-pointer"
                  onClick={() => {
                    deleteImage(file.value._id);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoData data={"Images"} />
        )}
      </div>
    </div>
  );
};

export default DisplayGallery;
