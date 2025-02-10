import Layout from "../comps/Layout";
import CreateTaxForm from "../comps/CreateTaxForm";
import AdminSidebar from "../comps/AdminSidebar";
import TaxTable from "../comps/Taxtable";
import { useState, useEffect } from "react";
import axios from "axios";

const Tax = () => {
  const [taxCreated, setTaxCreated] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <div className="w-full flex flex-col justify-start items-center min-h-screen">
          <CreateTaxForm
            setTaxCreated={setTaxCreated}
            categories={categories}
          />
          <TaxTable taxCreated={taxCreated} categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default Tax;
