/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCookies } from "react-cookie";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

type ProtectedRouteProps = RouteProps & {};

const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  const [cookies, __] = useCookies(["accessToken"]);
  const isAuth = cookies.accessToken;

  if (isAuth) {
    return (
      <Routes>
        <Route {...routeProps} />
      </Routes>
    );
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
