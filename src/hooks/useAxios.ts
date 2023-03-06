import { useEffect, useState } from "react";
import axios, { RawAxiosRequestHeaders } from "axios";
import { backendURL } from "../config/server";

type UseAxiosProps = {
  url: string;
  method: "get" | "post" | "delete" | "put";
  body?: {};
  headers?: RawAxiosRequestHeaders;
};

axios.defaults.baseURL = backendURL;

function useAxios<R, E>(props: UseAxiosProps) {
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(true);
  const { url, method, body, headers } = props;

  const fetchData = () => {
    axios[method]<R>(url, headers, body)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, loading };
}

export default useAxios;
