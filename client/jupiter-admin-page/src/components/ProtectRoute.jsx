import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;
