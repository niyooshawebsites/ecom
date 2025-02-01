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

      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
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
      console.log(err.message);
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
      console.log(err.message);
    }
  };

  const fetchReviewsByProductName = async (formData) => {
    const pName = formData.get("pName");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews-by-product-name/${pName}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        console.log(res.data.data);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  const fetchReviewsByRating = async (formData) => {
    const rating = formData.get("rating");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews-by-rating/${rating}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  const fetchReviewsByStatus = async (formData) => {
    const status = formData.get("status");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews-by-status/${status}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [reviewStatusUpdation, reviewDeletion]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex flex-col justify-between items-center my-5 w-full">
        <div className="flex justify-center items-center my-5">
          <h1 className="text-4xl py-3 poppins-light bg-gray-200 rounded-md p-3">
            Reviews (
            {reviews.length < 10 ? `0${reviews.length}` : reviews.length})
          </h1>
          <button onClick={fetchAllReviews} className="ml-5">
            <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
          </button>
        </div>

        <div className="flex">
          <form action={fetchReviewsByRating} className="mr-3">
            <label htmlFor="rating" className="font-semibold">
              Rating:{" "}
            </label>
            <select
              className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600 mr-2"
              name="rating"
              id="rating"
            >
              <option value="">Select</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Search
            </button>
          </form>

          <form action={fetchReviewsByStatus} className="mr-3">
            <label htmlFor="status" className="font-semibold">
              Status:{" "}
            </label>
            <select
              className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600 mr-2"
              name="status"
              id="status"
            >
              <option value="">Select</option>s
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Search
            </button>
          </form>

          <form action={fetchReviewsByProductName}>
            <input
              type="text"
              placeholder="Product name"
              name="pName"
              id="pName"
              className="border border-gray-300 rounded p-1 mr-2"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Search
            </button>
          </form>
        </div>
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
