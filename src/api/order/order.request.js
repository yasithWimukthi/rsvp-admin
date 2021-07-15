import { apiInstance } from "../apiInstance";

export async function getNewOrders() {
  const PATH = "/order/newOrders";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function getDispatchedOrders() {
  const PATH = "/order/dispatchedOrders";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function getOrderById(id) {
  const PATH = "/order/get/" + id;
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function getItemListById(id) {
  const PATH = "/order/itemlist/" + id;
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}

export async function changeStatus(orderData) {
  const PATH = "/order/updateStatus";
  try {
    const res = await apiInstance.post(PATH, orderData);
    const apiRes = res.data;
    return apiRes.data;
  } catch (e) {
    throw e.name;
  }
}
