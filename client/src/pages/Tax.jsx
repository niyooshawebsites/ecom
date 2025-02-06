import Layout from "../comps/Layout";
import CreateTaxForm from "../comps/CreateTaxForm";
import AdminSidebar from "../comps/AdminSidebar";
import Taxtable from "../comps/Taxtable";
import { useState } from "react";

const Tax = () => {
  const [taxCreated, setTaxCreated] = useState(false);
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <div className="w-full flex flex-col justify-start items-center min-h-screen border border-red-500">
          <CreateTaxForm setTaxCreated={setTaxCreated} />
          <Taxtable taxCreated={taxCreated} />
        </div>
      </div>
    </Layout>
  );
};

export default Tax;
