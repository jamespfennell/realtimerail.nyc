import { useCallback, useEffect, useState } from "react";
import axios from "axios";

/**
 * HttpData is the type of the httpData prop in components created using withHttpData.
 *
 * An instance of the type has three possible states depending on the status of the HTTP request:
 * - Request pending: both response and error are null.
 * - Request succeeded: response is non-null, error is null.
 * - Request failed: response is null, error is non-null.
 *
 * The poll field can be invoked to perform the request again.
 */
export type HttpData<T> = {
  response: T | null;
  error: string | null;
  poll: () => void;
};

/**
 * useHttpData is a React hook for getting data from an HTTP request.
 *
 * If the provided URL is empty, then no HTTP request is performed and the returned data is
 * always in the pending state. The point of this feature is to allow chaining HTTP requests where
 * the URL of one request depends on a previous request. Because of React restrictions on hooks,
 * even when we don't have the URL of the second request we still need to add the hook to our
 * component.
 */
export function useHttpData<T>(
  url: string,
  pollInterval: number | null,
  deserializer: (object: any) => T,
): HttpData<T> {
  if (url === "") {
    pollInterval = null;
  }
  const [data, setData] = useState<HttpResponse<T>>({
    response: null,
    error: null,
  });
  const callback = useCallback((newData: HttpResponse<T>) => {
    setData((prevData) => {
      // If the HTTP request errors out and we previously had data, just keep the data.
      if (newData.error !== null && prevData.response !== null) {
        return prevData;
      }
      return newData;
    });
  }, []);

  // Always make an initial request.
  useEffect(() => {
    performRequest(url, deserializer, callback);
  }, [url, deserializer, callback]);

  // The actual poll interval is the poll interval, or null if the window does not have focus.
  //
  // The point of this is to prevent the app from making backend requests when the user isn't looking.
  // These requests are wasteful both for the user and the backend.
  const [actualPollInterval, setActualPollInterval] = useState<number | null>(
    pollInterval,
  );
  useEffect(() => {
    const start = () => setActualPollInterval(pollInterval);
    const stop = () => setActualPollInterval(null);
    window.addEventListener("focus", start);
    window.addEventListener("blur", stop);
    return () => {
      window.removeEventListener("focus", start);
      window.removeEventListener("blur", stop);
    };
  }, [pollInterval]);

  // If poll internal is set, also make requests periodically.
  useEffect(() => {
    if (actualPollInterval !== null) {
      const timer = setInterval(() => {
        performRequest(url, deserializer, callback);
      }, actualPollInterval);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [url, actualPollInterval, deserializer, callback]);

  return {
    response: data.response,
    error: data.error,
    poll: () => {
      performRequest(url, deserializer, callback);
    },
  };
}

type HttpResponse<T> = {
  response: T | null;
  error: string | null;
};

async function performRequest<T>(
  url: string,
  deserializer: (object: any) => T,
  callback: (r: HttpResponse<T>) => void,
) {
  if (url === "") {
    return;
  }
  axios
    .get(url)
    .then((response) => {
      callback({
        response: deserializer(response.data),
        error: null,
      });
    })
    .catch((error) => {
      let message = "";
      if (error.response) {
        message = "backend error"; // TODO this.transitermessage(error.response)
      } else {
        message = "no internet connection";
      }
      callback({
        response: null,
        error: message,
      });
    });
}
