import { Link } from "react-router-dom";
import Layout from "../comps/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col bg-gray-100 p-5 rounded-lg space-y-5">
          <h1 className="text-[200px] poppins-extralight text-orange-600">
            404
          </h1>
          <p className="text-center text-2xl ">Page not found!</p>
          <Link
            to="/"
            className="bg-blue-600 px-3 py-1 text-white text-2xl hover:bg-blue-700 rounded-md text-center"
          >
            Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
