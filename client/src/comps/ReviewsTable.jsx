import { useState, useEffect } from "react";
import axios from "axios";
import { SlRefresh } from "react-icons/sl";
import { toast } from "react-toastify";
import NoData from "./NoData";
import Loading from "./Loading";
import { RiDeleteBin6Line } from "react-icons/ri";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewStatusUpdation, setReviewStatusUpdation] = useState(false);
  const [reviewDeletion, setReviewDeletion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteReviews, setDeleteReviews] = useState([]);

  const handleCheckboxChange = (e) => {
    try {
      const { name, checked } = e.target;

      if (name === "selectAll") {
        const updatedReviews = reviews.map((review) => ({
          ...review,
          isChecked: checked, // Ensure every coupon gets updated
        }));

        setReviews(updatedReviews);
        setDeleteReviews(
          checked ? updatedReviews.map((review) => review._id) : []
        );
      } else {
        const updatedReviews = reviews.map((review) =>
          review._id === name ? { ...review, isChecked: checked } : review
        );

        setReviews(updatedReviews);
        setDeleteReviews(
          updatedReviews
            .filter((review) => review.isChecked)
            .map((review) => review._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEveryCheckbox = () => {
    return reviews.length > 0 && reviews.every((review) => review.isChecked);
  };

  const deleteMultiple = async () => {
    if (deleteReviews.length === 0) {
      toast.warn("No reviews selected!");
      return;
    }

    const confirmation = window.confirm(
      "Do you really want to delete selected reviews?"
    );

    if (!confirmation) return;

    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v1/delete-reviews",
        {
          data: {
            rids: deleteReviews,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        // Remove deleted products from state
        setReviews(
          reviews.filter((review) => !deleteReviews.includes(review._id))
        );
        setDeleteReviews([]);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete selected reviews");
    }
  };

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    const confimation = confirm("Do you really want to delete?");

    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-review/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviewDeletion((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const updateReview = async (formData) => {
    setLoading(true);

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
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchReviewsByProductName = async (formData) => {
    setLoading(true);

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
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchReviewsByRating = async (formData) => {
    setLoading(true);

    const rating = formData.get("rating");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews-by-rating/${rating}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchReviewsByStatus = async (formData) => {
    setLoading(true);

    const status = formData.get("status");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews-by-status/${status}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [reviewStatusUpdation, reviewDeletion]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
          {reviews.length > 0 ? (
            <>
              <div className="flex flex-col justify-between items-center my-5 w-full">
                <div className="flex justify-center items-center my-5">
                  <h1 className="text-4xl py-3 poppins-light bg-gray-200 rounded-md p-3">
                    Reviews (
                    {reviews.length < 10
                      ? `0${reviews.length}`
                      : reviews.length}
                    )
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
                    <th className="poppins-light border text-sm p-1">#</th>
                    <th className="poppins-light border text-sm p-1">
                      Product ID
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Product Name
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Product Img
                    </th>
                    <th className="poppins-light border text-sm p-1">Rating</th>
                    <th className="poppins-light border text-sm p-1">
                      Product Review
                    </th>
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
                        <td>
                          <input
                            type="checkbox"
                            name={review._id}
                            value={review._id}
                            onChange={handleCheckboxChange}
                            checked={review.isChecked}
                          />
                        </td>
                        <td className="border text-sm p-1">{index + 1}</td>
                        <td className="border text-sm p-1">
                          {review.product?._id}
                        </td>
                        <td className="border text-sm p-1">
                          {review.product?.name}
                        </td>
                        <td className="flex justify-center p-1">
                          <img
                            src={review.product?.img}
                            alt={review.product?.name}
                            width={40}
                          />
                        </td>
                        <td className="border text-sm p-1">{review.rating}</td>
                        <td className="border text-sm p-1">
                          {review.reviewMsg}
                        </td>
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
            </>
          ) : (
            <NoData data={"Reviews"} />
          )}
        </div>
      )}
    </>
  );
};

export default ReviewsTable;
