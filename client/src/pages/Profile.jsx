import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import ProfileForm from "../comps/ProfileForm";

const Profile = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ProfileForm />
      </div>
    </Layout>
  );
};

export default Profile;
