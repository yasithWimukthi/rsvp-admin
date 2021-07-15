import { useMemo } from "react";
import { usePagination } from "./usePagination";

// eslint-disable-next-line no-undef
export type FilterRowsFn = (rows, searchText) => [];

/**
 *
 * @param searchText
 * @param rows
 * @param filterFn function to filter rows by search value, should be memoized
 */
export function useFilterRows(searchText = "", rows, filterFn: FilterRowsFn) {
  const filteredData = useMemo(() => filterFn(rows, searchText.toLowerCase()), [
    filterFn,
    rows,
    searchText,
  ]);
  const { pageData, tableFooterProps } = usePagination(
    filteredData,
    3,
    searchText
  );
  const noMatchingItems = pageData.length === 0 && searchText !== "";
  return { pageData, tableFooterProps, noMatchingItems };
}

export function useFilterRowsSessions(
  searchText = "",
  sortBy,
  rows,
  filterFn: FilterRowsFn
) {
  const filteredData = useMemo(() => filterFn(rows, searchText.toLowerCase()), [
    filterFn,
    rows,
    searchText,
    sortBy,
  ]);
  const { pageData, tableFooterProps } = usePagination(
    filteredData,
    3,
    searchText
  );
  const noMatchingItems = pageData.length === 0 && searchText !== "";
  return { pageData, tableFooterProps, noMatchingItems };
}
