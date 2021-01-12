import { useState, useEffect } from "react";

export const useMedia = (media) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    function changeMatch() {
      const { matches } = matchMedia(media);

      setMatch(matches);
    }

    changeMatch();

    window.addEventListener("resize", changeMatch);

    return () => window.removeEventListener("resize", changeMatch);
  }, [media]);

  return match;
};
