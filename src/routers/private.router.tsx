import { Navigate, Outlet } from "react-router-dom";
import { localStorageUtil } from "../helpers/localstorage.helper";

const PrivateRoute = () => {
  const token = localStorageUtil.get("accessToken"); 

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
