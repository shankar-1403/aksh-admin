import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("aksh_admin");

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;