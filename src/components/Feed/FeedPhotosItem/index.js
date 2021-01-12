import React from "react";

import SkeletonLoading from "../../SkeletonLoading";

import styles from "./feedphotositem.module.css";

const FeedPhotosItem = ({ picture, setModalPhoto }) => {
  function handleOpenModal() {
    setModalPhoto(picture);
  }

  return (
    <li className={styles.photo} onClick={handleOpenModal}>
      <SkeletonLoading alt={picture.title} src={picture.src} />
      <span className={styles.textViews}>{picture.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
