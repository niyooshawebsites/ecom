import Layout from "../comps/Layout";
import Card from "../comps/Card";
import Sidebar from "../comps/ShopSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);

  const fetchProductsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductsData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortBy = async (e) => {
    try {
      const sortParam = e.target.value;
      console.log(sortParam);
      const res = await axios.get(
        `http://localhost:8000/api/v1/sort-by?sortParam=${sortParam}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductsData(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <div className="w-full flex flex-col px-2">
          <div className="flex justify-end my-3">
            <select name="sortBy" id="sortBy" onChange={sortBy}>
              <option value="">Sort by</option>
              <option value="lowToHigh">Low to high</option>
              <option value="highToLow">High to low</option>
              <option value="topRated">Top rated</option>
              <option value="bestSellers">Best sellers</option>
            </select>
          </div>
          <section className="w-10/12 flex flex-wrap">
            {productsData.map((product) => {
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
            })}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Shop;
