import React, { useEffect } from "react";

import FeedPhotosItem from "../FeedPhotosItem";
import Loading from "../../Loading";

import { useFetch } from "../../../hooks/useFetch";

import { GET_PICTURES } from "../../../services/api";

import styles from "./feedphotos.module.css";

const FeedPhotos = ({ page, user, setModalPhoto, setInfinitePage }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function loadPictures() {
      const total = 6;
      const { url, options } = GET_PICTURES({ page, total, user });

      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < total) {
        setInfinitePage(false);
      }
    }

    loadPictures();
  }, [request, user]);

  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((picture) => (
          <FeedPhotosItem
            key={picture.id}
            picture={picture}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  } else {
    return <Loading />;
  }
};

export default FeedPhotos;
