import axios from "axios";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protect = () => {
  const [access, setAccess] = useState(false);

  const { uid } = useSelector((state) => state.user_Slice);

  const checkAccess = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/check-access/${uid}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setAccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  checkAccess();

  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default Protect;
