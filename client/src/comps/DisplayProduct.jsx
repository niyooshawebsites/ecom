import { useState } from "react";
import { cartSliceActions } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DisplayProduct = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { category, product, pid } = useParams();

  const [cartProducts, setCartProducts] = useState([]);

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
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`,
        { withCredentials: true }
      );

      if (data.success) toast.success(data.msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-9/12 mx-auto mt-5">
      <section className="flex ">
        <section className=" flex justify-center w-5/12 border m-5">
          <img src="/img/watch.webp" alt="wooden watch" />
        </section>
        <section className="w-7/12 flex flex-col p-10">
          <section className="flex flex-col mb-5">
            <h1 className="text-5xl mb-5">Wooden watch</h1>
            <p className="mb-4">Category: {category}</p>
            <h2 className="text-5xl text-blue-500 mb-5">$200</h2>
            <h2 className="text-2xl mb-5">Short product description</h2>
            <p className="w-6/12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              perspiciatis aspernatur aperiam corrupti corporis eaque voluptate
              id distinctio beatae eum.
            </p>
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
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic itaque
          ipsa, molestiae quo vitae adipisci ratione voluptatibus aliquam
          quaerat. Consequuntur maxime, quidem unde, ipsam, cupiditate ad nihil
          rerum nemo quisquam odit provident expedita dolorem illum beatae
          itaque voluptates nisi doloremque minima eligendi molestiae officiis
          iusto. Doloribus dolores obcaecati adipisci maxime. Enim quae natus ex
          beatae. Ut suscipit excepturi id vitae quis reiciendis quisquam
          cupiditate cum impedit? Illum, error suscipit recusandae amet
          obcaecati corporis, dignissimos dolore qui doloribus aperiam deleniti
          maxime cumque laboriosam earum natus aliquid soluta quia praesentium
          rem repellendus, nam voluptate! Aliquid officiis sapiente minus
          similique cupiditate non. Tenetur excepturi ab, nostrum aliquam
          blanditiis corporis cupiditate ipsam ex, quaerat, saepe natus
          veritatis minima officia unde modi laborum. Laboriosam voluptate iure
          dolore magni excepturi blanditiis vel beatae? Architecto vero nihil
          nobis beatae quas, eum labore et? Ducimus laboriosam dicta odit quos
          assumenda qui error pariatur, maxime quaerat culpa veniam repudiandae
          consectetur alias! Atque sapiente placeat voluptas incidunt, nisi
          maiores voluptate iure? Reiciendis minus facilis consequatur unde
          dicta consectetur, eum accusamus maiores in magnam ipsum nihil
          nostrum, dignissimos sapiente. Officia sequi debitis pariatur!
          Architecto dicta aspernatur sint perferendis consequuntur nulla
          expedita ratione aliquid obcaecati blanditiis eveniet facilis aliquam
          est, assumenda minus?
        </p>
      </section>
    </main>
  );
};

export default DisplayProduct;
