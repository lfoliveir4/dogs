import React from "react";

import UserContext from "./UserContext";

const AppProvider = ({ children }) => {
  return <UserContext>{children}</UserContext>;
};

export default AppProvider;
