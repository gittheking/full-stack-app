import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataRemote } from "../types/DataRemote";

export function useTestEndpoint(param: string) {
  const [testRemote, setTestRemote] = useState<DataRemote<string, string>>({
    status: "not-asked",
  });

  const abortControllerRef = useRef<AbortController | undefined>();

  function fetchTestEndPoint() {
    const controller = new AbortController();
    setTestRemote({ status: "loading" });
    abortControllerRef.current = controller;
    axios
      .get(`/api/test/${param}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setTestRemote({ status: "success", data: response.data.data });
      })
      .catch((error) =>
        setTestRemote({
          status: "failure",
          error: error?.message ?? "something went wrong",
        })
      );
  }

  // Hook to trigger request to test endpoint
  useEffect(() => {
    // ONLY fetch if we haven't already
    if (testRemote.status === "not-asked") {
      fetchTestEndPoint();
    }
  }, [testRemote]);

  useEffect(() => {
    setTestRemote({ status: "not-asked" });
  }, [param]);

  // Hook to clean up any pending requests
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return testRemote;
}
