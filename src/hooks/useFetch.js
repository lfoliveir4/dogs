import { useState, useCallback } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }
    } catch (error) {
      console.log(error);
      json = null;
      setError(error.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { data, error, loading, request };
};
