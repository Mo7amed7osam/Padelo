import { useContext } from "react";
import { user } from "../../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const authUser = useContext(user);
  const location = useLocation();

  return authUser.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to="/Login" />
  );
}
