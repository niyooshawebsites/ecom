import { useState, useEffect } from "react";
import axios from "axios";
import { SlRefresh } from "react-icons/sl";
import { toast } from "react-toastify";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews/1`,
        { withCredentials: true }
      );

      console.log(res.data.data);

      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-review/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex">
        <h1 className="text-4xl py-3 poppins-light my-10">Reviews</h1>
        <button onClick={fetchAllReviews} className="ml-5">
          <SlRefresh className="text-4xl text-blue-600 hover:text-blue-700" />
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white h-10 m-10">
          <tr>
            <th>#</th>
            <th className="poppins-light">Product ID</th>
            <th className="poppins-light">Product Name</th>
            <th className="poppins-light">Product Img</th>
            <th className="poppins-light">Product Review</th>
            <th className="poppins-light">Time</th>
            <th className="poppins-light">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => {
            return (
              <tr
                key={review._id}
                className="odd:bg-white even:bg-gray-300 h-10 text-center border"
              >
                <td>{index + 1}</td>
                <td>{review.product?._id}</td>
                <td>{review.product?.name}</td>
                <td className="flex justify-center p-1">
                  <img
                    src={review.product?.img}
                    alt={review.product?.name}
                    width={40}
                  />
                </td>
                <td>{review.review}</td>
                <td>
                  {review.createdAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td>
                  <button
                    className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700"
                    onClick={() => {
                      deleteReview(review._id);
                    }}
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
  );
};

export default ReviewsTable;
