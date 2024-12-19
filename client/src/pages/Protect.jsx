import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protect = () => {
  const { uid } = useSelector((state) => state.user_Slice);

  return uid ? <Outlet /> : <Navigate to="/login" />;
};

export default Protect;
