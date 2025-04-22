import { useState, useEffect } from "react";
import { SlRefresh } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NoData from "./NoData";
import axios from "axios";

const CarouselInfo = () => {
  const [carouselData, setCarouselData] = useState([]);

  const fetchAllCarsoulselData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-carousel-products`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCarouselData(res.data.data);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCaouselData = () => {};

  const handleCheckboxChange = () => {};

  const deleteMultiple = () => {};

  const checkEveryCheckbox = () => {};

  useEffect(() => {
    fetchAllCarsoulselData();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      {console.log(carouselData)}
      {carouselData.length > 0 ? (
        <div className="w-6/12 border">
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
              Featured Carousel (
              {carouselData.length < 10
                ? `0${carouselData.length}`
                : carouselData.length}
              )
            </h1>
            <button onClick={fetchAllCarsoulselData} className="ml-5">
              <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
            </button>
          </div>

          <table className="w-full border">
            <thead className="bg-blue-600 h-10 m-10">
              <tr className="border">
                <th className="h-10 flex justify-evenly items-center">
                  <input
                    type="checkbox"
                    name="selectAll"
                    onChange={handleCheckboxChange}
                    checked={checkEveryCheckbox()}
                  />
                  <RiDeleteBin6Line
                    style={{
                      fontSize: "25px",
                      color: "gold",
                      cursor: "pointer",
                    }}
                    onClick={deleteMultiple}
                  />
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  #
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Product ID
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Product name
                </th>
                <th className="poppins-light text-white border text-sm p-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {carouselData.map((carousel, index) => {
                return (
                  <tr
                    key={carousel._id}
                    className="odd:bg-white even:bg-gray-300 h-10"
                  >
                    <td className="text-center border text-sm p-1">
                      <input
                        type="checkbox"
                        name={carousel._id}
                        value={carousel._id}
                        onChange={handleCheckboxChange}
                        checked={carousel.isChecked}
                      />
                    </td>
                    <td className="text-center border text-sm p-1">
                      {index + 1}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {carousel.product._id}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {carousel.product.name}
                    </td>
                    <td className="text-center border text-sm">
                      <Link to={`/dashboard/update-category/${carousel._id}`}>
                        <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 mr-2">
                          Edit
                        </span>
                      </Link>{" "}
                      <button
                        onClick={() => {
                          deleteCaouselData(carousel._id);
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
        </div>
      ) : (
        <NoData data={"Home page info"} />
      )}
    </div>
  );
};

export default CarouselInfo;
