import React, { useState } from "react";

import { useFetch } from "../../../hooks/useFetch";
import Error from "../../../components/Error";

import { CREATE_COMMENT } from "../../../services/api";
import { ReactComponent as Submit } from "../../../assets/enviar.svg";

import styles from "./photocommentsform.module.css";

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = useState("");

  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("dog:token");

    const { url, options } = CREATE_COMMENT(id, { comment }, token);

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />

      <button className={styles.button}>
        <Submit />
      </button>

      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
