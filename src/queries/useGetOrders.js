import { queryCache, useQuery } from "react-query";
import { getNewOrders, getDispatchedOrders } from "../api/order/order.request";

const New_ORDER_LIST = "New_ORDER_LIST";
const DISPATCHED_ORDER_LIST = "DISPATCHED_ORDER_LIST";

export function useGetNewOrders() {
  return useQuery(New_ORDER_LIST, getNewOrders);
}

export function refetchNewOrders() {
  return queryCache.invalidateQueries(New_ORDER_LIST);
}

export function useGetDispatchedOrders() {
  return useQuery(DISPATCHED_ORDER_LIST, getDispatchedOrders);
}

export function refetchDispatchedOrders() {
  return queryCache.invalidateQueries(DISPATCHED_ORDER_LIST);
}
