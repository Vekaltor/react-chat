import React from "react";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

type ProtectedRouteProps = RouteProps & {
  isAuth: boolean;
};

const ProtectedRoute = ({ isAuth, ...routeProps }: ProtectedRouteProps) => {
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
