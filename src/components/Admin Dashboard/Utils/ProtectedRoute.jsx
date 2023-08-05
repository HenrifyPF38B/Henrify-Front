import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ active, redirected = "/home" }) => {
  if (!active) {
    return <Navigate to={redirected} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
