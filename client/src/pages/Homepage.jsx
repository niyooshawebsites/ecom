import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import HomepageInfo from "../comps/HomepageInfo";

const Homepage = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <HomepageInfo />
      </div>
    </Layout>
  );
};

export default Homepage;
