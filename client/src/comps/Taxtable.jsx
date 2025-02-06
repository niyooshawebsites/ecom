import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import Pagination from "./Pagination";

const TaxTable = ({ taxCreated }) => {
  const [taxes, setTaxes] = useState([]);
  const [taxDeleted, setTaxDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllTaxes = async (pageNo) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-taxes/${pageNo}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setTaxes(res.data.data);
        setTotalPages(res.data.totalPagesCount);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTax = async (tid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-tax/${tid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setTaxDeleted((prev) => !prev);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchTax = async (formData) => {
    try {
      const tid = formData.get("tid");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-tax/${tid}`
      );

      if (res.data.success) {
        setTaxes([res.data.data]);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllTaxes(currentPage);
  }, [taxDeleted, currentPage, taxCreated]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center">
      <div className="w-full">
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
            Tax Details ({taxes.length < 10 ? `0${taxes.length}` : taxes.length}
            )
          </h1>
          <button onClick={fetchAllTaxes} className="ml-5">
            <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
          </button>
        </div>

        <div className="flex my-3">
          <form action={fetchTax} className="flex w-full">
            <input
              type="text"
              name="tid"
              id="tid"
              placeholder="Tax ID"
              className="border border-gray-300 rounded p-1 mr-2 w-full"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Search
            </button>
          </form>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 h-10 m-10">
            <tr className="">
              <th className="poppins-light text-white border text-sm p-1">#</th>
              <th className="poppins-light text-white border text-sm p-1">
                Tax ID
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                Country
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                State
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                Tax name
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                Tax Rate
              </th>
              <th className="poppins-light text-white border text-sm p-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax, index) => {
              return (
                <tr
                  key={tax._id}
                  className="odd:bg-white even:bg-gray-300 h-10"
                >
                  <td className="text-center border text-sm p-1">
                    {index + 1}
                  </td>
                  <td className="text-center border text-sm p-1">{tax._id}</td>
                  <td className="text-center border text-sm p-1">
                    {tax.country}
                  </td>
                  <td className="text-center border text-sm p-1">
                    {tax.state}
                  </td>
                  <td className="text-center border text-sm p-1">{tax.name}</td>
                  <td className="text-center border text-sm p-1">{tax.rate}</td>
                  <td className="text-center border text-sm">
                    <Link to={`/dashboard/update-category/${tax._id}`}>
                      <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 mr-2">
                        Edit
                      </span>
                    </Link>{" "}
                    <button
                      onClick={() => {
                        deleteTax(tax._id);
                      }}
                      className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TaxTable;
