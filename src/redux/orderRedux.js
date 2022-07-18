import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //GET ALL 
    getOrderStart: (state) =>
      Object.assign(state, {
        isFetching: true,
        error: false
      }),
    getOrderSuccess: (state, action) =>
      Object.assign(state, {
        orders: action.payload,
        isFetching: false
      }),
    getOrderFailure: (state) =>
      Object.assign(state, {
        error: true,
        isFetching: false
      }),
    //GET ALL ENDPOINT
    // UPDATE ONE ORDER
    updateOrderStart: (state) => Object.assign(state, {
      isFetching: true,
      error: false
    }),
    updateOrderSuccess: (state, action) => {
      state.isFetching = false
      state.orders[state.orders.findIndex(
        ({ _id }) => _id === action.payload._id)] = action.payload
      state.error = false
    },
    updateOrderFailure: (state) => Object.assign(state,
      {
        isFetching: false,
        error: false
      }),
    // UPDATE ONE ORDER ENDPOINT
       // DELETE ONE BY ID
       deleteOrderStart: (state) =>
       Object.assign(state, {
         isFetching: true,
         error: false,
       }),
     deleteOrderSuccess: (state, { payload }) =>
       Object.assign(state, {
         isFetching: false,
         orders: state.orders.filter(
           item => item._id !== payload
         )
       }),
     deleteOrderError: (state) =>
       Object.assign(state, {
         isFetching: false,
         error: true
       }),
  }

})
export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  updateOrderStart,
 updateOrderSuccess,
 updateOrderFailure,
 deleteOrderStart,
 deleteOrderSuccess,
 deleteOrderFailure,
} = orderSlice.actions
export default orderSlice.reducer