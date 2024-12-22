import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import ReviewsTable from "../comps/ReviewsTable";

const Reviews = () => {
  return (
    <Layout>
      <main className="flex">
        <AdminSidebar />
        <ReviewsTable />
      </main>
    </Layout>
  );
};

export default Reviews;
