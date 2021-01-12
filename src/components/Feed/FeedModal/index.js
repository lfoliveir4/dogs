import React, { useEffect } from "react";

import Error from "../../Error";
import Loading from "../../Loading";
import PhotoContent from "../../../pages/Photo/PhotoContent";

import { GET_PICTURE } from "../../../services/api";

import { useFetch } from "../../../hooks/useFetch";

import styles from "./feedmodal.module.css";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = GET_PICTURE(photo.id);

    request(url, options);
  }, [photo, request]);

  function handleOutSideModal(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutSideModal}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
