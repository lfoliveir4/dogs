import React from "react";

import styles from "./button.module.css";

const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
