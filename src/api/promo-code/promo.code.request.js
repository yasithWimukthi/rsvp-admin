import { apiInstance } from "../apiInstance";

export async function addPromoCode(requestData) {
  const PATH = "/promo-code/add";

  try {
    const res = await apiInstance.post(PATH, requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    throw e.name;
  }
}

export async function getPromoCodeById(codeId) {
  const PATH = `/promo-code/get/${codeId}`;
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function deletePromoCode(codeId) {
  const PATH = `/promo-code/delete/${codeId}`;
  try {
    const res = await apiInstance.delete(PATH);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    throw e.name;
  }
}

export async function getAllPromoCodes() {
  const PATH = "/promo-code/list";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}
