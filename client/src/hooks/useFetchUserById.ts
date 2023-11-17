import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/User";
import { DataRemote } from "../types/DataRemote";

// Custom hook to fetch users from express backend
export function useFetchUserById(
  id: string
): [DataRemote<User, string>, () => void] {
  const [userDataRemote, setUserDataRemote] = useState<
    DataRemote<User, string>
  >({ status: "not-asked" });

  function fetchUsers() {
    setUserDataRemote({ status: "loading" });
    axios
      .get(`/api/user/${id}`)
      .then((response) =>
        setUserDataRemote({ status: "success", data: response.data.data })
      )
      .catch((err) =>
        setUserDataRemote({
          status: "failure",
          error: err?.message ?? "Failed to fetch users",
        })
      );
  }

  // Hook to trigger fetch Both
  // - "on mount"
  // - when remote is set back to {status: "not-asked"}
  useEffect(() => {
    if (userDataRemote.status === "not-asked") {
      fetchUsers();
    }
  }, [userDataRemote]);

  function refetchData() {
    setUserDataRemote({ status: "not-asked" });
  }

  return [userDataRemote, refetchData];
}
