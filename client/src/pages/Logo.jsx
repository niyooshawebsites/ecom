import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import LogoForm from "../comps/LogoForm";

const Logo = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <LogoForm />
      </div>
    </Layout>
  );
};

export default Logo;
