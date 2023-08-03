import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRout = () => {
  const adminStatus = useSelector((state) => state.admin.status);

  return adminStatus === "ok" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRout;
