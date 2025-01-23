import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../comps/ShopSidebar";
import Layout from "../../comps/Layout";
import Card from "../../comps/Card";
import axios from "axios";

const FilterByCategory = () => {
  const { cid } = useParams();
  const [productsData, setProductsData] = useState([]);

  const fetchProductsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products-by-category/${cid}`,
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

  useEffect(() => {
    fetchProductsData();
  }, [cid]);

  return (
    <Layout>
      <main className="flex">
        <Sidebar />
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
                <h3 className="mb-3">No products in this category.</h3>
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
      </main>
    </Layout>
  );
};

export default FilterByCategory;
