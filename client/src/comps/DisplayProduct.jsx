import { useEffect, useState } from "react";
import { cartSliceActions } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CreateReviewForm from "./CreateReviewForm";
import { FaStar } from "react-icons/fa";

const DisplayProduct = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { product, pid } = useParams();
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const increatement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreament = () => {
    setCount((prevCount) => prevCount - 1);
    if (count == 0) {
      setCount(0);
    }
  };

  const addToCart = () => {
    dispatch(cartSliceActions.populateCartProduct(product));
    setCartProducts([...cartProducts, product]);
    dispatch(
      cartSliceActions.populateCartList({
        cartProductList: cartProducts,
      })
    );
  };

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews/${pid}/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createRatingArray = (rating) => {
    let ratingArray = [];
    ratingArray.length = rating;
    for (let i = 0; i < rating; i++) {
      ratingArray.push(i);
    }
    return ratingArray;
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, []);

  return (
    <main className="w-9/12 mx-auto mt-5">
      <section className="flex ">
        <section className=" flex justify-center w-5/12 border m-5">
          <img src={productData.img} style={{ height: "500px" }} />
        </section>
        <section className="w-7/12 flex flex-col p-10">
          <section className="flex flex-col mb-5">
            <h1 className="text-5xl mb-5">{productData.name}</h1>
            <p className="mb-4">Category: {productData.category?.name}</p>
            <h2 className="text-5xl text-blue-500 mb-5">
              ${productData.price}
            </h2>
            <h2 className="text-2xl mb-5">Short product description</h2>
            <p className="w-6/12">{productData.shortDesc}</p>
          </section>
          <section className="w-5/12 flex justify-evenly items-center">
            <button
              className="bg-gray-200 py-2 px-4 border rounded-md text-xl hover:bg-gray-300"
              onClick={decreament}
            >
              -
            </button>
            <span>{count}</span>
            <button
              className="bg-gray-200 py-2 px-4 border rounded-md text-xl hover:bg-gray-300"
              onClick={increatement}
            >
              +
            </button>
            <button
              className="bg-blue-600 py-2 px-4 border rounded-md text-xl text-gray-100 hover:bg-blue-700"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </section>
        </section>
      </section>
      <hr />
      <section className="p-10">
        <h2 className="text-3xl mb-5">Product Description</h2>
        <p>{productData.longDesc}</p>
      </section>
      <section className="p-10">
        <h2 className="text-3xl mb-5">Write a Review</h2>
        <CreateReviewForm />
      </section>
      <section className="p-10">
        <h2 className="text-3xl mb-5">Product Reviews</h2>
        {reviews.map((review) => {
          return (
            <div key={review._id} className="border p-3 rounded-lg mb-3">
              {createRatingArray(review.rating).map((rating, index) => {
                return (
                  <FaStar
                    key={index}
                    className="inline text-xl text-yellow-500 mb-3"
                  />
                );
              })}
              <p className="mb-3">{review.reviewMsg}</p>
              <p className="mb-3">
                {review.createdAt.split("T")[0].split("-").reverse().join("-")}
                {" | "}
                {review.createdAt.split("T")[1].slice(0, 8)}
              </p>
              <p className="font-medium">{review.reviewer.username}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default DisplayProduct;
