/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCookies } from "react-cookie";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

type ProtectedRouteProps = RouteProps & {};

const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  const [cookies2, ___] = useCookies();
  const [cookies, __] = useCookies(["user"]);
  const isActiveSession: string | undefined = cookies.user;

  console.log(cookies2)

  if (isActiveSession) {
    return (
      <Routes>
        <Route {...routeProps} />
      </Routes>
    );
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
