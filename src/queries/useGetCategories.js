import { queryCache, useQuery } from "react-query";
import { getCategories } from "../api/category/category.request";

const CATEGORY_LIST = "CATEGORY_LIST";

export function useGetCategories() {
  return useQuery(CATEGORY_LIST, getCategories);
}

export function refetchCategories() {
  return queryCache.invalidateQueries(CATEGORY_LIST);
}
