import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Error from "../../components/Error";
import Head from "../../components/Head";

import { UPLOAD_PICURE } from "../../services/api";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import styles from "./userphotopost.module.css";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");

  const { data, error, request, loading } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/conta");
    }
  }, [data, navigate]);

  const [img, setImg] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = localStorage.getItem("dog:token");

    const { url, options } = UPLOAD_PICURE(formData, token);

    request(url, options);
  }

  function handleImg(event) {
    setImg({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form
        data-testid="test-register-form-upload-picture"
        onSubmit={handleSubmit}
      >
        <Input
          label="Nome"
          type="text"
          name="nome"
          {...nome}
          placeholder="Nome"
        />

        <Input
          label="Peso"
          type="number"
          name="peso"
          {...peso}
          placeholder="Peso"
        />

        <Input
          label="Idade"
          type="number"
          name="idade"
          {...idade}
          placeholder="Idade"
        />

        <input
          type="file"
          className={styles.file}
          name="img"
          id="img"
          onChange={handleImg}
          data-testid="input-upload-picture"
        />

        {loading ? (
          <Button disabled>Enviando ...</Button>
        ) : (
          <Button>Enviar</Button>
        )}

        <Error error={error} />
      </form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          >
            {" "}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
