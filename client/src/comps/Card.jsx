import { Link } from "react-router-dom";

const Card = ({ pid, name, price, img, category, shortDesc, longDesc }) => {
  return (
    <Link to={`/${category}/${name}/${pid}`} className="w-3/12">
      <div className="flex flex-col border rounded-lg text-center p-2 m-3 hover:border-gray-400 hover:scale-105 hover:transition">
        <img src={img} alt="wooden watch" style={{ height: "250px" }} />
        <h1 className="text-xl">{name}</h1>
        <h2 className="text-lg text-gray-500">{category}</h2>
        <h2 className="text-xl text-yellow-600">Rs {price}</h2>
      </div>
    </Link>
  );
};

export default Card;
