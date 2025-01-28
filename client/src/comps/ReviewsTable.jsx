import { useState, useEffect } from "react";
import axios from "axios";
import { SlRefresh } from "react-icons/sl";
import { toast } from "react-toastify";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewStatusUpdation, setReviewStatusUpdation] = useState(false);
  const [reviewDeletion, setReviewDeletion] = useState(false);

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
        setReviewDeletion((prev) => !prev);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateReview = async (formData) => {
    try {
      const rid = formData.get("rid");
      const status = formData.get("status");

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-review`,
        { rid, status },
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviewStatusUpdation((prev) => !prev);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [reviewStatusUpdation, reviewDeletion]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex">
        <h1 className="text-4xl py-3 poppins-light mt-10 mb-2">Reviews</h1>
        <button onClick={fetchAllReviews} className="ml-5">
          <SlRefresh className="text-4xl text-blue-600 hover:text-blue-700" />
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white h-10 m-10">
          <tr>
            <th className="poppins-light border text-sm p-1">#</th>
            <th className="poppins-light border text-sm p-1">Product ID</th>
            <th className="poppins-light border text-sm p-1">Product Name</th>
            <th className="poppins-light border text-sm p-1">Product Img</th>
            <th className="poppins-light border text-sm p-1">Rating</th>
            <th className="poppins-light border text-sm p-1">Product Review</th>
            <th className="poppins-light border text-sm p-1">Status</th>
            <th className="poppins-light border text-sm p-1">Time</th>
            <th className="poppins-light border text-sm p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => {
            return (
              <tr
                key={review._id}
                className="odd:bg-white even:bg-gray-300 h-10 text-center border"
              >
                <td className="border text-sm p-1">{index + 1}</td>
                <td className="border text-sm p-1">{review.product?._id}</td>
                <td className="border text-sm p-1">{review.product?.name}</td>
                <td className="flex justify-center p-1">
                  <img
                    src={review.product?.img}
                    alt={review.product?.name}
                    width={40}
                  />
                </td>
                <td className="border text-sm p-1">{review.rating}</td>
                <td className="border text-sm p-1">{review.reviewMsg}</td>
                <td className="border text-sm p-1">{review.status}</td>
                <td className="border text-sm p-1">
                  {review.createdAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td className="border text-sm p-1">
                  <div className="flex justify-center items-center">
                    <form action={updateReview}>
                      <input
                        type="text"
                        name="rid"
                        defaultValue={review._id}
                        readOnly
                        className="hidden"
                      />
                      <select
                        name="status"
                        id="status"
                        className="border rounded-md mr-2"
                        required
                      >
                        <option>Select status</option>
                        <option value="Accepted">Accept</option>
                        <option value="Rejected">Reject</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-orange-600 px-1 rounded-md text-white hover:bg-orange-700"
                      >
                        Update
                      </button>
                    </form>
                    <button
                      className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700 ml-2"
                      onClick={() => {
                        deleteReview(review._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
