import Layout from "../comps/Layout";
import Card from "../comps/Card";
import Sidebar from "../comps/Sidebar";

const Shop = () => {
  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <section className="w-10/12 flex flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </main>
    </Layout>
  );
};

export default Shop;
