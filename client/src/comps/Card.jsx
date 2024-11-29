import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Link to={"/category/product/id"} className="w-3/12">
      <div className="flex flex-col border rounded-lg text-center p-2 m-5 hover:border-gray-400 hover:scale-105 hover:transition">
        <img src="/img/watch.webp" alt="wooden watch" />
        <h1 className="text-3xl">Wooden watch</h1>
        <h2 className="text-xl text-gray-500">Watch</h2>
        <h2 className="text-4xl text-yellow-600">$200</h2>
      </div>
    </Link>
  );
};

export default Card;
