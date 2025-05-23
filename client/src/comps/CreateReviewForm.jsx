import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { useState } from "react";
import reviewSchema from "../utils/validation/reviewSchema";

const CreateReviewForm = ({ pid }) => {
  const { uid } = useSelector((state) => state.user_Slice);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCreateReview = async (formData) => {
    try {
      const rating = formData.get("rating");
      const reviewMsg = formData.get("reviewMsg");

      const result = reviewSchema.safeParse({ rating, reviewMsg });

      if (result.success) {
        setLoading(true);
      }

      if (!result.success) {
        const formattedErrors = result.error.format();
        setErrors(formattedErrors);
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `http://localhost:8000/api/v1/create-review/${pid}`,
        { rating, reviewMsg, uid },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form action={handleCreateReview} className="w-full">
          <div className="flex flex-col mb-3">
            <label htmlFor="rating" className="mb-2">
              Rating
            </label>
            <select
              name="rating"
              id="rating"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              required
            >
              <option>Select Rating</option>
              <option value="1">1 - Bad</option>
              <option value="1">2 - Satisfactory</option>
              <option value="1">3 - Good</option>
              <option value="1">4 - Very good</option>
              <option value="5">5 - Excellent</option>
            </select>
            {errors.rating && (
              <p className="text-red-500">{errors.rating._errors[0]}</p>
            )}
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="review" className="mb-2">
              Review
            </label>
            <textarea
              name="reviewMsg"
              id="reviewMsg"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              rows={5}
              placeholder="Write your review"
              required
            ></textarea>
            {errors.reviewMsg && (
              <p className="text-red-500">{errors.reviewMsg._errors[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      )}
    </>
  );
};

export default CreateReviewForm;
