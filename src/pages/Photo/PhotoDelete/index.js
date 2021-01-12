import React from "react";

import { PHOTO_DELETE } from "../../../services/api";

import { useFetch } from "../../../hooks/useFetch";

import styles from "./photodelete.module.css";

const PhotoDelete = ({ id }) => {
  const { request, loading } = useFetch();

  async function handleDeletePicture() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");

    if (confirm) {
      const token = localStorage.getItem("dog:token");

      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);

      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          ...deletando
        </button>
      ) : (
        <button onClick={handleDeletePicture} className={styles.delete}>
          deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
