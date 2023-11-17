import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import { css } from "@emotion/css";
import { DataTable } from "./DataTable";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { User } from "../types/User";
import { Column } from "../types/DataTable";
import { useQueryParams } from "../hooks/useQueryParams";
import { useHistory } from "react-router-dom";

const userTableColumns: Column<User>[] = [
  {
    key: "first_name",
    title: "First Name",
    alignment: "left",
    getData: (user) => user.firstName,
  },
  {
    key: "last_name",
    title: "Last Name",
    alignment: "left",
    getData: (user) => user.lastName,
  },
  {
    key: "email",
    title: "Email",
    alignment: "left",
    getData: (user) => user.email,
  },
  {
    key: "phone_number",
    title: "Phone Number",
    alignment: "left",
    getData: (user) => user.phoneNumber,
  },
  {
    key: "company",
    title: "Company",
    alignment: "left",
    getData: (user) => user.company,
  },
];

const containerClassName = css`
  width: 100%;
  max-width: 1100px;
  margin: 16px auto;
`;

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [userDataRemote, _refetchUsers] = useFetchUsers();

  const history = useHistory();
  const queryParams = useQueryParams();
  const page = queryParams.get("page")
    ? Number(queryParams.get("page"))
    : undefined;

  // Hook to add page qs param to URl if not present
  useLayoutEffect(() => {
    if (!page && page !== 0) {
      history.replace({ search: "?page=0" });
    }
  }, [page]);

  useEffect(() => {
    if (userDataRemote.status === "success") {
      setUsers(userDataRemote.data);
    }
  }, [userDataRemote]);

  function onNextPage() {
    if (page || page === 0) {
      history.push({ search: `?page=${page + 1}` });
    }
  }

  function onPreviousPage() {
    if (page || page === 0) {
      history.push({ search: `?page=${page - 1}` });
    }
  }

  function onUserRowClick(user: User) {
    history.push(`/users/${user.id}`);
  }

  return (
    <div className={containerClassName}>
      <DataTable<User>
        data={users}
        pageSize={10}
        page={page ?? 0}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        isLoading={userDataRemote.status === "loading"}
        getRowKey={(user) => user.firstName + "_" + user.lastName}
        columns={userTableColumns}
        onRowClick={onUserRowClick}
      />
    </div>
  );
}
