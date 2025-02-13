import { useState, useEffect } from "react";
import { SlRefresh } from "react-icons/sl";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import NoData from "./NoData";

const DisplayGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  const fetchAllGalleryImages = async () => {
    try {
      const res = axios.get(`http://localhost:8000/api/v1/`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setGalleryImages(res.data.data);
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const uplaodGalleryImages = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload-gallery-images`,
        galleryImages,
        { withCredentials: true }
      );

      if (res.data.sucess) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteImage = async () => {
    try {
      const res = axios.delete(
        `http://localhost:8000/api/v1/delete-gallery-image`
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
    fetchAllGalleryImages();
  }, []);

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
          <form action={uplaodGalleryImages} className="flex w-full">
            <input
              type="file"
              name="images"
              id="images"
              placeholder="Upload images"
              className="border border-gray-300 rounded p-1 mr-2 w-full"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Upload
            </button>
          </form>
        </div>
        {galleryImages.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-blue-600 h-10 m-10">
              <tr className="">
                <th className="poppins-light text-white border text-sm p-1">
                  #
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Category ID
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Category name
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {galleryImages.map((image, index) => {
                return (
                  <tr
                    key={image._id}
                    className="odd:bg-white even:bg-gray-300 h-10"
                  >
                    <td className="text-center border text-sm p-1">
                      {index + 1}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {image._id}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {image.name}
                    </td>
                    <td className="text-center border text-sm">
                      <Link to={`/dashboard/update-category/${image._id}`}>
                        <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 mr-2">
                          Edit
                        </span>
                      </Link>{" "}
                      <button
                        onClick={() => {
                          deleteImage(image._id);
                        }}
                        className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoData data={"Images"} />
        )}
      </div>
    </div>
  );
};

export default DisplayGallery;
