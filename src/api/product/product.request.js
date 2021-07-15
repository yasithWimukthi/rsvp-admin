import { apiInstance } from "../apiInstance";

export async function addProduct(requestData) {
  const PATH = "/product/add";
  try {
    const res = await apiInstance.post(PATH, requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    throw e.name;
  }
}

export async function getProductById(productId) {
  const PATH = `/product/get/${productId}`;
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function deleteProduct(productId) {
  const PATH = `/product/delete/${productId}`;
  try {
    const res = await apiInstance.delete(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function getAllProducts() {
  const PATH = "/product/list";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function getProductsBySubcategory(id) {
  const PATH = "/product/bySubcategory/" + id;
  try {
    if (id !== "") {
      const res = await apiInstance.get(PATH);
      const apiRes = res.data;
      return apiRes.data;
    }
  } catch (e) {
    throw e.name;
  }
}
