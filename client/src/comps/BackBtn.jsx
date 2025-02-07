import { Link } from "react-router-dom";

const BackBtn = ({ link }) => {
  return (
    <div className="w-11/12 flex justify-start items-center my-3">
      <Link
        className="bg-green-600 px-2 py-1 hover:bg-green-700 text-white rounded-md"
        to={link}
      >
        Go Back
      </Link>
    </div>
  );
};

export default BackBtn;
