import { apiInstance } from "../apiInstance";

export async function addCategory(requestData) {
  const PATH = "/parentCategories/add";
  try {
    const res = await apiInstance.post(PATH, requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    throw e.name;
  }
}

export async function getCategories() {
  const PATH = "/parentCategories/list";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function deleteCategory(categoryId) {
  const PATH = `/parentCategories/delete/${categoryId}`;
  try {
    const res = await apiInstance.delete(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}
