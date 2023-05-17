import React from "react";
import { Navigate } from "react-router-dom";
import TokenService from "services/TokenService";

export { PrivateRoute };

function PrivateRoute({ children }) {
  if (!TokenService.getAccessToken()) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
}
