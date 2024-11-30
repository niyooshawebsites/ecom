import Layout from "../comps/Layout";
import Card from "../comps/Card";
import Sidebar from "../comps/Sidebar";
import productsData from "../data/products";

const Shop = () => {
  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <section className="w-10/12 flex flex-wrap">
          {productsData.map((product) => {
            return (
              <Card
                key={product.uid}
                pid={product.uid}
                name={product.name}
                price={product.price}
                img={product.img}
                category={product.category}
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
