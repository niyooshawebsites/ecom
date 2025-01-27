import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const queryStrings = new URLSearchParams(location.search);

  const authToken = queryStrings.get("authToken");
  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
