import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import PhotoContent from "./PhotoContent";

import { GET_PICTURE_BY_ID } from "../../services/api";

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = GET_PICTURE_BY_ID(id);

    request(url, options);
  }, [request, id]);

  if (data) {
    return (
      <section className="container mainContainer">
        <PhotoContent single data={data} />
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Photo;
