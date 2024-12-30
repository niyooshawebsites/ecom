import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateReviewForm = () => {
  const { uid } = useSelector((state) => state.user_Slice);

  const handleCreateReview = async (formData) => {
    try {
      const rating = formData.get("rating");
      const reviewMsg = formData.get("reviewMsg");

      const res = await axios.post(
        `http://localhost:8000/api/v1/create-review`,
        { rating, reviewMsg, uid },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action={handleCreateReview} className="w-full">
      <div className="flex flex-col mb-3">
        <label htmlFor="rating" className="mb-2">
          Rating
        </label>
        <select
          name="rating"
          id="rating"
          className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
        >
          <option>Select Rating</option>
          <option value="1">1 - Bad</option>
          <option value="1">2 - Satisfactory</option>
          <option value="1">3 - Good</option>
          <option value="1">4 - Very good</option>
          <option value="5">5 - Excellent</option>
        </select>
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
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default CreateReviewForm;
