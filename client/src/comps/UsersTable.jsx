import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import NoData from "./NoData";
import Loading from "./Loading";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const UsersTable = () => {
  const { uid } = useSelector((state) => state.user_Slice);
  const [users, setUsers] = useState([]);
  const [activationToggled, setActivationToggled] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState([]);

  const handleCheckboxChange = (e) => {
    try {
      const { name, checked } = e.target;

      if (name === "selectAll") {
        const updatedUsers = users.map((user) => ({
          ...user,
          isChecked: checked, // Ensure every coupon gets updated
        }));

        setUsers(updatedUsers);
        setDeleteUsers(checked ? updatedUsers.map((user) => user._id) : []);
      } else {
        const updatedUsers = users.map((user) =>
          user._id === name ? { ...user, isChecked: checked } : user
        );

        setUsers(updatedUsers);
        setDeleteUsers(
          updatedUsers.filter((user) => user.isChecked).map((user) => user._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEveryCheckbox = () => {
    return users.length > 0 && users.every((user) => user.isChecked);
  };

  const deleteMultiple = async () => {
    if (deleteUsers.length === 0) {
      toast.warn("No products selected!");
      return;
    }

    const confirmation = window.confirm(
      "Do you really want to delete selected products?"
    );

    if (!confirmation) return;

    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v1/delete-users",
        {
          data: {
            uids: deleteUsers,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        // Remove deleted products from state
        setUsers(users.filter((user) => !deleteUsers.includes(user._id)));
        setDeleteUsers([]);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete selected coupons");
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-users/${uid}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const toggleActivationStatus = async (formData) => {
    setLoading(true);

    try {
      const uid = formData.get("uid");
      const activationStatus = formData.get("activationStatus");

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-activation-status/${uid}`,
        { activationStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        setActivationToggled((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const deleteUser = async (uid) => {
    const confimation = confirm("Do you really want to delete?");

    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-user/${uid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUserDeleted((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchUserByEmail = async (formData) => {
    setLoading(true);

    try {
      const userEmail = formData.get("userEmail");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-user-by-email/${userEmail}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsers([res.data.data]);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchUsersByActiveStatus = async (formData) => {
    setLoading(true);

    try {
      const activeStatus = formData.get("activeStatus");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-users-by-active-status/${activeStatus}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsers(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchUsersByVerificationStatus = async (formData) => {
    setLoading(true);

    try {
      const verificationStatus = formData.get("verificationStatus");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-users-by-verification-status/${verificationStatus}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsers(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchUsersByDates = async (formData) => {
    setLoading(true);

    try {
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-users-by-dates/${startDate}/${endDate}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsers(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [activationToggled, userDeleted]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
          {users.length > 0 ? (
            <>
              <div className="flex flex-col justify-between items-center my-5 w-full">
                <div className="flex justify-center items-center my-5">
                  <h1 className="text-4xl py-3 poppins-light bg-gray-200 rounded-md p-3">
                    Users (
                    {users.length < 10 ? `0${users.length}` : users.length})
                  </h1>
                  <button onClick={fetchAllUsers} className="ml-5">
                    <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
                  </button>
                </div>

                <div className="flex items-center">
                  <form action={fetchUsersByDates} className=" flex mr-5">
                    <div className=" border p-1 rounded mr-3">
                      <label htmlFor="startDate" className="font-semibold">
                        From:{" "}
                      </label>
                      <input type="date" name="startDate" id="startDate" />
                    </div>

                    <div className=" border p-1 rounded mr-3">
                      <label htmlFor="endDate" className="font-semibold">
                        To:{" "}
                      </label>
                      <input type="date" name="endDate" id="endDate" />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form
                    action={fetchUsersByVerificationStatus}
                    className="mr-3"
                  >
                    <label
                      htmlFor="verificationStatus"
                      className="font-semibold"
                    >
                      Verification:{" "}
                    </label>
                    <select
                      className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600"
                      name="verificationStatus"
                      id="verificationStatus"
                    >
                      <option value="">Select</option>s
                      <option value="Verified">Verified</option>
                      <option value="Unverified">Unverified</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form action={fetchUsersByActiveStatus} className="mr-3">
                    <label htmlFor="activeStatus" className="font-semibold">
                      Status:{" "}
                    </label>
                    <select
                      className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600"
                      name="activeStatus"
                      id="activeStatus"
                    >
                      <option value="">Select</option>s
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form action={fetchUserByEmail}>
                    <input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      placeholder="User email"
                      className="border border-gray-300 rounded p-1 mr-2"
                      required
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <table className="w-full border">
                <thead className="bg-blue-600 text-white h-10 m-10">
                  <tr>
                    <th className="h-10 flex justify-evenly items-center">
                      <input
                        type="checkbox"
                        name="selectAll"
                        onChange={handleCheckboxChange}
                        checked={checkEveryCheckbox()}
                      />

                      <RiDeleteBin6Line
                        style={{
                          fontSize: "25px",
                          color: "gold",
                          cursor: "pointer",
                        }}
                        onClick={deleteMultiple}
                      />
                    </th>
                    <th className="poppins-light border text-sm p-1">#</th>
                    <th className="poppins-light border text-sm p-1">
                      User ID
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Username
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      User email
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Verification status
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Activation status
                    </th>
                    <th className="poppins-light border text-sm p-1">
                      Created At
                    </th>
                    <th className="poppins-light border text-sm p-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr
                        key={user._id}
                        className="odd:bg-white even:bg-gray-300 h-10 text-center border"
                      >
                        <td>
                          <input
                            type="checkbox"
                            name={user._id}
                            value={user._id}
                            onChange={handleCheckboxChange}
                            checked={user.isChecked}
                          />
                        </td>
                        <td className="border text-sm p-1">{index + 1}</td>
                        <td className="border text-sm p-1">{user._id}</td>
                        <td className="border text-sm p-1">{user.username}</td>
                        <td className="border text-sm p-1">{user.email}</td>
                        <td className="border text-sm p-1">
                          {user.isVerified ? "Verified" : "Unverfied"}
                        </td>
                        <td className="border text-sm p-1">
                          {user.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="border text-sm p-1">
                          {user.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td className="border text-sm p-1">
                          <div className="flex justify-center items-center">
                            <form action={toggleActivationStatus}>
                              <input
                                type="text"
                                name="uid"
                                defaultValue={user._id}
                                readOnly
                                className="hidden"
                              />
                              <select
                                name="activationStatus"
                                id="activationStatus"
                                className="border rounded-md mr-2"
                                required
                              >
                                <option>Select status</option>
                                <option value="Activate">Activate</option>
                                <option value="Deactivate">Deactivate</option>
                              </select>
                              <button
                                type="submit"
                                className="bg-orange-600 px-1 rounded-md text-white hover:bg-orange-700"
                              >
                                Update
                              </button>
                            </form>
                            <button
                              className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700 ml-2"
                              onClick={() => {
                                deleteUser(user._id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <NoData data={"Users"} />
          )}
        </div>
      )}
    </>
  );
};

export default UsersTable;
