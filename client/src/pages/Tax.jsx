import Layout from "../comps/Layout";
import CreateTaxForm from "../comps/CreateTaxForm";
import AdminSidebar from "../comps/AdminSidebar";
import TaxTable from "../comps/TaxTable";
import { useState } from "react";

const Tax = () => {
  const [taxCreated, setTaxCreated] = useState(false);

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <div className="w-full flex flex-col justify-start items-center min-h-screen">
          <CreateTaxForm setTaxCreated={setTaxCreated} />
          <TaxTable taxCreated={taxCreated} />
        </div>
      </div>
    </Layout>
  );
};

export default Tax;
