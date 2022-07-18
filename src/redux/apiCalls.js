import { addUserFailure, addUserStart, addUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUserFailure, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./orderRedux";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
     const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, product, id) => {
  dispatch(updateProductStart())
  try {
    const { data } = await userRequest.put(`/products/${id}`, product)
    dispatch(updateProductSuccess({ product: data }))
  } catch (error) {
    dispatch(updateProductFailure())
  }
};
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    //add
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    //get users
    const res = await userRequest.get(`/users`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    //get delete
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
export const updateUser = async (dispatch, user, id) => {
  dispatch(updateUserStart())
  try {
    const { data } = await userRequest.put(`/users/${id}`, user)
    dispatch(updateUserSuccess({ user: data }))
  } catch (error) {
    dispatch(updateUserFailure())
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    //add
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
// GET ALL ORDERS 
export const getOrders = async (dispatch)=> {
  dispatch(getOrderStart())
  try {
    const {data} = await userRequest.get("/orders/")
    dispatch(getOrderSuccess(data))
  } catch (err) {
    dispatch(getOrderFailure())
  }
}
// GET ALL ORDERS ENDPOINT
// UPDATE ORDER
export const updateOrder = async (dispatch, newInformation, id) => {
  dispatch(updateOrderStart())
  try {
    const { data } = await userRequest.put(`/orders/${id}`, newInformation)
    dispatch(updateOrderSuccess(data))
  } catch (err) {
    dispatch(updateOrderFailure())
    
  }
}
//  DELETE product
export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart())
  try {
    await userRequest.delete(`/orders/${id}`)
    dispatch(deleteOrderSuccess(id))
  } catch (error) {
    dispatch(deleteOrderFailure())
  }
}
//  DELETE product endpoint
// UPDATE ORDER ENDPOINT