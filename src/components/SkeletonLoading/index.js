import React, { useState } from "react";
import styles from "./skeletonloading.module.css";

const SkeletonLoading = ({ alt, ...rest }) => {
  const [skeleton, setSekeleton] = useState(true);

  function handleLoadImg(event) {
    setSekeleton(false);
    event.target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoadImg} className={styles.img} alt={alt} {...rest} />
    </div>
  );
};

export default SkeletonLoading;
