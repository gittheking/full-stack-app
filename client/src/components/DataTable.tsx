import { useState, useMemo } from "react";
import { css } from "@emotion/css";
import { Column } from "../types/DataTable";

type DataTableProps<T> = {
  page: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  data: T[];
  pageSize: number;
  isLoading: boolean;
  columns: Column<T>[];
  getRowKey: (item: T) => string;
  onRowClick: (item: T) => void;
};

const tableClassName = css`
  width: 100%;
  border: solid 1px #e6e6e6;
  border-collapse: collapse;
  tr:nth-of-type(2n) {
    background-color: #e6e6e6;
  }
  tbody > tr:hover {
    background-color: #777777;
    cursor: pointer;
  }
`;

const tableCellClassName = css`
  border: solid 1px #e6e6e6;
  padding: 8px 12px;
`;

const tableFooterClassName = css`
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const paginationActions = css`
  button {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export function DataTable<T>({
  data,
  pageSize,
  page,
  onNextPage,
  onPreviousPage,
  isLoading,
  columns,
  getRowKey,
  onRowClick,
}: DataTableProps<T>) {
  const viewableRows = useMemo(() => {
    const startIndex = page * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [page, data]);

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th
                key={column.key}
                align={column.alignment}
                className={tableCellClassName}
              >
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td className={tableCellClassName} colSpan={columns.length}>
              Loading...
            </td>
          </tr>
        ) : (
          viewableRows.map((row, rowIdx) => {
            return (
              <tr
                key={getRowKey(row) + "-" + rowIdx}
                onClick={() => onRowClick(row)}
              >
                {columns.map((column, colIdx) => {
                  return (
                    <td
                      key={rowIdx + "_" + colIdx}
                      align={column.alignment}
                      className={tableCellClassName}
                    >
                      {column.getData(row)}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <div className={tableFooterClassName}>
              {`Viewing rows ${page * pageSize + 1} - ${Math.min(
                (page + 1) * pageSize,
                data.length
              )} of ${data.length}`}
              <div className={paginationActions}>
                <button disabled={page === 0} onClick={onPreviousPage}>
                  Previous Page
                </button>
                <button
                  disabled={(page + 1) * pageSize >= data.length}
                  onClick={onNextPage}
                >
                  Next Page
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
