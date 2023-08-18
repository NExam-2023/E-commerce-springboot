// Route.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import jwt_decode from "jwt-decode";


export const AdminRoute = ({ element: Component, ...rest }) => {
   const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage
  const decodedToken = jwt_decode(localStorage.getItem("token"));

  return hasToken && decodedToken.user.role === "ADMIN"  ? (
    <div className="app">
      <Sidebar />{" "}
      <div className="app-content">
        <Component {...rest} />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
export const CustomerRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage
  const decodedToken = jwt_decode(localStorage.getItem("token"));

  return hasToken && decodedToken.user.role === "CUSTOMER" ? (
    <div className="app">
      <Sidebar />{" "}
      <div className="app-content">
        <Component {...rest} />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Custom PublicRoute component to handle redirection
export const PublicRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Component {...rest} />
  );
};


PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
AdminRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
CustomerRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
