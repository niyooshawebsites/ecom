import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../comps/ShopSidebar";
import Layout from "../../comps/Layout";
import Card from "../../comps/Card";
import axios from "axios";

const FilterByName = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const queryParams = new URLSearchParams(location.search);

  const cid = queryParams.get("cid") || "na";
  const sortParam = queryParams.get("sortParam");
  const pSlug = queryParams.get("pSlug");

  const fetchProductsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products-by-slug/${pSlug}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductsData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setProductsData([]);
    }
  };

  const sortBy = async (e) => {
    try {
      navigate(`/sort-by?cid=${cid}&sortParam=${e.target.value}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [sortParam, pSlug, cid]);

  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <div className="w-full flex flex-col px-2">
          <div className="flex justify-end my-3">
            <select name="" id="" onChange={sortBy}>
              <option value="lowToHigh">Sort by</option>
              <option value="lowToHigh">Low to high</option>
              <option value="lowToHigh">High to low</option>
            </select>
          </div>
          <section className="w-10/12 flex flex-wrap">
            {productsData.length > 0 ? (
              productsData.map((product) => {
                return (
                  <Card
                    key={product._id}
                    pid={product._id}
                    name={product.name}
                    price={product.price}
                    img={product.img}
                    category={product.category?.name}
                    shortDesc={product.shortDesc}
                    longDesc={product.longDesc}
                  />
                );
              })
            ) : (
              <div className=" flex w-full justify-center items-start">
                <div className="flex flex-col justify-center items-center w-4/12 h-36 p-10 bg-gray-200 rounded-lg mt-10">
                  <h3 className="mb-3">No products in this price range.</h3>
                  <Link
                    className="bg-blue-600 py-2 px-4 border rounded-md text-xl text-gray-100 hover:bg-blue-700"
                    to="/"
                  >
                    Go the shop
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default FilterByName;
