import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { user } from "../../Context/UserContext";
import Cookies from "universal-cookie";
import LoadingScreen from "../../Components/Loading";

export default function PersistLogin() {
  // Get Current Token
  const context = useContext(user);
  const token = context.auth.token;
  const userData = context.auth.userDetails;

  // Save Token In Cookies
  const cookie = new Cookies();
  cookie.set("userData", userData);
  const getData = cookie.get("userData");
  const getToken = cookie.get("UserToken");

  // Loading Screen
  const [loading, setLoading] = useState("true");

  // Keep Logged In Each Refresh (Without Refresh Token)
  useEffect(() => {
    async function refresh() {
      try {
        cookie.set("UserToken", getToken);
        context.setAuth({ token: getToken, userDetails: getData });
      } finally {
        setLoading(false);
      }
    }

    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <LoadingScreen /> : <Outlet />;
}
