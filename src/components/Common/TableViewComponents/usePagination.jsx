import React, { useEffect, useMemo, useState } from "react";
import { TableFooterPaginationProps } from "./TableFooterPagination";

// eslint-disable-next-line no-undef
export type FilterRowsFn = (rows, searchText: string) => [];

/**
 *
 * @param rows
 * @param defaultPageSize
 * @param key change to reset page to 0
 */
export function usePagination(rows, defaultPageSize = 10, key = "defaultKey") {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  useEffect(() => {
    setPage(0);
    // TODO on automatic data refresh, keep current data if page!==0
  }, [key, rows, rowsPerPage]);
  const pageData = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );
  const tableFooterProps: TableFooterPaginationProps = useMemo(
    function getFooterProps() {
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = (event: React.ChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      const tableFooterProps: TableFooterPaginationProps = {
        totalRecordCount: rows.length,
        rowsPerPage,
        handleChangeRowsPerPage,
        page,
        handleChangePage,
      };
      return tableFooterProps;
    },
    [page, rows.length, rowsPerPage]
  );
  return { pageData, tableFooterProps };
}
