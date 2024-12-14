import Layout from "../comps/Layout";
import Card from "../comps/Card";
import Sidebar from "../comps/Sidebar";
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

  useEffect(() => {
    fetchProductsData();
  }, []);
  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <section className="w-10/12 flex flex-wrap">
          {productsData.map((product) => {
            return (
              <Card
                key={product._id}
                pid={product._id}
                name={product.slug}
                price={product.price}
                img={product.img}
                category={product.category.name}
                shortDesc={product.shortDesc}
                longDesc={product.longDesc}
              />
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default Shop;
