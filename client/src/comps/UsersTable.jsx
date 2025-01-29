import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [activationToggled, setActivationToggled] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-users`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  const toggleActivationStatus = async (formData) => {
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
    }
  };

  const deleteUser = async (uid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-user/${uid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUserDeleted((prev) => !prev);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [activationToggled, userDeleted]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex justify-between items-center mt-10 w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl py-3 poppins-light mb-2">Users</h1>
          <button onClick={fetchAllUsers} className="ml-5">
            <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
          </button>
        </div>

        <div>
          <form action="" className="">
            <input
              type="text"
              placeholder="User ID"
              className="border border-gray-300 rounded p-1 mr-2"
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
            <th className="poppins-light border text-sm p-1">#</th>
            <th className="poppins-light border text-sm p-1">User ID</th>
            <th className="poppins-light border text-sm p-1">Username</th>
            <th className="poppins-light border text-sm p-1">User email</th>
            <th className="poppins-light border text-sm p-1">
              Verification status
            </th>
            <th className="poppins-light border text-sm p-1">
              Activation status
            </th>
            <th className="poppins-light border text-sm p-1">Created At</th>
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
                  {user.createdAt.split("T")[0].split("-").reverse().join("-")}
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
    </div>
  );
};

export default UsersTable;
