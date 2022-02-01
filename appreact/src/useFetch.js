import React from "react";

export const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const doRequest = React.useCallback(async (url, options = {}) => {
    let response,
      json = null;
    try {
      setLoading(true);
      response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText || "Something went wrong 😞");
      }
      json = await response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { data, loading, error, doRequest };
};
