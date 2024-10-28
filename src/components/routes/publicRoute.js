import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ element: Component, restricted, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated && restricted ? (
    <Navigate to="/" />
  ) : (
    <Component {...rest} />
  );
};

export default PublicRoute;
