import { useEffect, useState } from "react";
import { cartSliceActions } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import CreateReviewForm from "./CreateReviewForm";
import { FaStar } from "react-icons/fa";

const DisplayProduct = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  // const { pid } = useParams();
  const location = useLocation();
  const queryStrings = new URLSearchParams(location.search);
  const pid = queryStrings.get("pid");
  const [productData, setProductData] = useState({});
  const [reviews, setReviews] = useState([]);
  const { cartProductList } = useSelector((state) => state.cart_Slice);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    if (count == 0) {
      setCount(0);
    }
  };

  const addToCart = () => {
    if (count > 0) {
      const additionalQuantity = count;

      cartProductList.map((product) => {
        // if the product is already available in the cart
        if (product.productId == pid) {
          dispatch(
            cartSliceActions.populateCartProduct({
              productId: pid,
              productName: productData.name,
              productPrice: productData.price,
              productCategory: productData.category?.name,
              productCid: productData.category?._id,
              productQuantity: product.productQuantity + additionalQuantity,
              productTotalAmount: product.productQuantity * productData.price,
            })
          );

          const otherCartProductsList = cartProductList.filter(
            (product) => product.productId !== pid
          );

          dispatch(
            cartSliceActions.populateCartList({
              cartProductList: [
                ...otherCartProductsList,
                {
                  productId: pid,
                  productName: productData.name,
                  productPrice: productData.price,
                  productCategory: productData.category?.name,
                  productCid: productData.category?._id,
                  productQuantity: product.productQuantity + additionalQuantity,
                  productTotalAmount:
                    (product.productQuantity + additionalQuantity) *
                    productData.price,
                },
              ],
            })
          );
        }

        // if the product is not available in the cart
        if (product.productId !== pid) {
          dispatch(
            cartSliceActions.populateCartProduct({
              productId: pid,
              productName: productData.name,
              productPrice: productData.price,
              productCategory: productData.category?.name,
              productCid: productData.category?._id,
              productQuantity: count,
              productTotalAmount: count * productData.price,
            })
          );

          dispatch(
            cartSliceActions.populateCartList({
              cartProductList: [
                ...cartProductList,
                {
                  productId: pid,
                  productName: productData.name,
                  productPrice: productData.price,
                  productCategory: productData.category?.name,
                  productCid: productData.category?._id,
                  productQuantity: count,
                  productTotalAmount: count * productData.price,
                },
              ],
            })
          );
        }
      });

      // if the product is not available in the cart
      if (cartProductList.length == 0) {
        dispatch(
          cartSliceActions.populateCartProduct({
            productId: pid,
            productName: productData.name,
            productPrice: productData.price,
            productCategory: productData.category?.name,
            productCid: productData.category?._id,
            productQuantity: count,
            productTotalAmount: count * productData.price,
          })
        );

        dispatch(
          cartSliceActions.populateCartList({
            cartProductList: [
              ...cartProductList,
              {
                productId: pid,
                productName: productData.name,
                productPrice: productData.price,
                productCategory: productData.category?.name,
                productCid: productData.category?._id,
                productQuantity: count,
                productTotalAmount: count * productData.price,
              },
            ],
          })
        );
      }
    } else {
      alert("Add atleast one item to the cart");
    }
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
      console.log(err.message);
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
      console.log(err.message);
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
      <div className={`${cartProductList.length > 0 ? "block" : "hidden"}`}>
        <p className="border-b-2  border-t-2 text-center py-3">
          Your cart has products.{" "}
          <Link
            className="bg-orange-600 py-1 px-1 rounded-md  text-gray-100 hover:bg-orange-700"
            to="/cart"
          >
            View cart
          </Link>
        </p>
      </div>
      <section className="flex ">
        <section className=" flex justify-center w-5/12 border m-5">
          <img src={productData.img} style={{ height: "500px" }} />
        </section>
        <section className="w-7/12 flex flex-col p-10">
          <section className="flex flex-col mb-5">
            <h1 className="text-5xl mb-5">{productData.name}</h1>
            <p className="mb-4">Category: {productData.category?.name}</p>
            <h2 className="text-5xl text-orange-500 mb-5">
              Rs {productData.price}
            </h2>
            <h2 className="text-2xl mb-5">Short product description</h2>
            <p className="w-6/12">{productData.shortDesc}</p>
          </section>
          <section className="w-5/12 flex justify-evenly items-center ">
            <button
              className="bg-gray-200 py-2 px-4 border rounded-md text-xl hover:bg-gray-300 "
              onClick={decrement}
            >
              -
            </button>
            <span className="px-1 text-xl">{count}</span>
            <button
              className="bg-gray-200 py-2 px-4 border rounded-md text-xl hover:bg-gray-300"
              onClick={increment}
            >
              +
            </button>
            <button
              className="bg-blue-600 py-2 px-4 border rounded-md text-xl text-gray-100 hover:bg-blue-700 "
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
        <div className="mb-5">
          <h2 className="text-3xl mb-2">Write a Review</h2>
          <p className="text-gray-400">Please login to leave a comment</p>
        </div>
        <CreateReviewForm pid={pid} />
      </section>
      <section className="p-10">
        <h2 className="text-3xl mb-5">Product Reviews</h2>
        {reviews.length > 0
          ? reviews.map((review) => {
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
                    {review.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                    {" | "}
                    {review.createdAt.split("T")[1].slice(0, 8)}
                  </p>
                  <p className="font-medium">{review.reviewer.username}</p>
                </div>
              );
            })
          : "No reviews yet. Be the first one to review!"}
      </section>
    </main>
  );
};

export default DisplayProduct;
