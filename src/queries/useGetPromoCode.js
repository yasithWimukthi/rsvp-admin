import { queryCache, useQuery } from "react-query";
import { PromoCodeAPI } from "../api/promo-code";

const PROMO_CODE_LIST = "PROMO_CODE_LIST";

export function useGetPromoCodes() {
  return useQuery(PROMO_CODE_LIST, PromoCodeAPI.getAllPromoCodes);
}

export function refetchPromoCodes() {
  return queryCache.invalidateQueries(PROMO_CODE_LIST);
}

export function useGetPromoCodeById(id) {
  return useQuery(["SELECTED_PROMO_CODE", id], PromoCodeAPI.getPromoCodeById);
}
