import { useEffect, useState } from "react";
import { cartSliceActions } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import CreateReviewForm from "./CreateReviewForm";
import { FaStar } from "react-icons/fa";
import ModalImage from "react-modal-image";
import Loading from "./Loading";

const DisplayProduct = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryStrings = new URLSearchParams(location.search);
  const pid = queryStrings.get("pid");
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    price: "",
    img: null,
    gallery: [],
    category: "",
    length: "",
    breadth: "",
    height: "",
    weight: "",
    shortDesc: "",
    longDesc: "",
  });
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
              length: productData.length,
              breadth: productData.breadth,
              height: productData.height,
              weight: productData.weight,
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
                  length: productData.length,
                  breadth: productData.breadth,
                  height: productData.height,
                  weight: productData.weight,
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
              length: productData.length,
              breadth: productData.breadth,
              height: productData.height,
              weight: productData.weight,
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
                  length: productData.length,
                  breadth: productData.breadth,
                  height: productData.height,
                  weight: productData.weight,
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
            length: productData.length,
            breadth: productData.breadth,
            height: productData.height,
            weight: productData.weight,
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
                length: productData.length,
                breadth: productData.breadth,
                height: productData.height,
                weight: productData.weight,
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
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductData((prev) => {
          return {
            ...prev,
            name: res.data.data.name,
            slug: res.data.data.slug,
            price: res.data.data.price,
            img: res.data.data.img,
            gallery: res.data.data.gallery,
            category: res.data.data.category,
            length: res.data.data.length,
            breadth: res.data.data.breadth,
            height: res.data.data.height,
            weight: res.data.data.weight,
            shortDesc: res.data.data.shortDesc,
            longDesc: res.data.data.longDesc,
          };
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-reviews/${pid}/1`,
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
    <>
      {loading ? (
        <Loading />
      ) : (
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
            <section className=" flex justify-center w-6/12 border rounded-md m-5">
              <div className="flex flex-col justify-start items-center mr-5">
                {productData.gallery.map((imgURL, index) => {
                  return (
                    <ModalImage
                      key={index}
                      small={imgURL.value}
                      large={imgURL.value}
                      alt={productData.name}
                      className="h-[150px] my-2 rounded-md"
                    />
                  );
                })}
              </div>
              <div>
                <ModalImage
                  small={productData.img}
                  large={productData.img}
                  alt={productData.name}
                  className="h-[500px] my-2 rounded-md"
                />
              </div>
            </section>

            <section className="w-7/12 flex flex-col p-10">
              <section className="flex flex-col mb-5">
                <h1 className="text-5xl mb-5">{productData.name}</h1>
                <p className="mb-4">Category: {productData.category?.name}</p>
                <h2 className="text-5xl text-orange-500 mb-5">
                  Rs {productData.price}
                </h2>
                <h2 className="text-2xl mb-5">Short product description</h2>
                <p className="w-8/12">{productData.shortDesc}</p>
              </section>
              <section className="w-8/12 flex justify-center space-x-4 items-center ">
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
                    <div
                      key={review._id}
                      className="border p-3 rounded-lg mb-3"
                    >
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
      )}
    </>
  );
};

export default DisplayProduct;
