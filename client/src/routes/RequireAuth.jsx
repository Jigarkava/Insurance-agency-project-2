import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  useEffect(() => {
    if (!localStorage.getItem("agentId")) {
      return <Navigate to="/login" />;
    }
  });
  return <Outlet />;
};

export default RequireAuth;
