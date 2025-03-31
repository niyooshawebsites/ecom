import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import Loading from "../comps/Loading";
import { useState } from "react";
import HomepageInfo from "../comps/HomepageInfo";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        {loading ? <Loading /> : <HomepageInfo />}
      </div>
    </Layout>
  );
};

export default Homepage;
