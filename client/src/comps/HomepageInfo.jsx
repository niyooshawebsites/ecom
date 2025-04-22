import { Link } from "react-router-dom";

const HomepageInfo = () => {
  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <div className="w-3/12">
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
            Homepage Info
          </h1>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 h-10 m-10">
            <tr className="border">
              <th className="poppins-light text-white border text-sm p-1">
                Carousel/Slider
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-300 h-10">
              <td className="border text-sm p-1">Featured Carousel</td>
              <td className="text-center border text-sm">
                <Link to={`/dashboard?hpc=featured-carousel`}>
                  <span className="bg-blue-600 px-1 rounded-md text-white hover:bg-blue-700 mr-2">
                    View
                  </span>
                </Link>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-300 h-10">
              <td className="border text-sm p-1">Sale Carousel</td>
              <td className="text-center border text-sm">
                <Link to={`/dashboard?hpc=sale-carousel`}>
                  <span className="bg-blue-600 px-1 rounded-md text-white hover:bg-blue-700 mr-2">
                    View
                  </span>
                </Link>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-300 h-10">
              <td className="border text-sm p-1">Top seller Carousel</td>
              <td className="text-center border text-sm">
                <Link to={`/dashboard/?hpc=top_seller-carousel`}>
                  <span className="bg-blue-600 px-1 rounded-md text-white hover:bg-blue-700 mr-2">
                    View
                  </span>
                </Link>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-300 h-10">
              <td className="border text-sm p-1">Image Slider</td>
              <td className="text-center border text-sm">
                <Link to={`/dashboard?hpc=image_slider`}>
                  <span className="bg-blue-600 px-1 rounded-md text-white hover:bg-blue-700 mr-2">
                    View
                  </span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomepageInfo;
