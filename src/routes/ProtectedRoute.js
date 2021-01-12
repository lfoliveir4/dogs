import React from "react";
import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRouter = (props) => {
  const { logged } = useContext(UserContext);

  if (logged) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
