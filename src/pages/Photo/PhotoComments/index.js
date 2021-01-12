import React, { useContext, useState, useRef, useEffect } from "react";

import { UserContext } from "../../../context/UserContext";
import PhotoCommentsForm from "../PhotoCommentsForm";

import styles from "./photocomments.module.css";

const PhotoComments = (props) => {
  const [comments, setComments] = useState(() => props.comments);

  const commentsSectionRef = useRef(null);

  const { logged } = useContext(UserContext);

  useEffect(() => {
    commentsSectionRef.current.scrollTop =
      commentsSectionRef.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSectionRef}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {logged && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
