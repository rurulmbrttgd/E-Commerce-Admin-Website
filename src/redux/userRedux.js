import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        users: [],
        currentUser : null,
        isFetching:false,
        error:false,
        
    },
    reducers: {
        loginStart: (state) => {
          state.isFetching = true;
        },
        loginSuccess: (state, action) => {
          state.isFetching = false;
          state.currentUser = action.payload;
        },
        loginFailure: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        //GET USERS
      getUserStart:(state) => {
        state.isFetching = true;
        state.error = false;
      },
      getUserSuccess:(state, action) => {
        state.isFetching = false;
        state.users = action.payload;
      },
      getUserFailure:(state) => {
        state.isFetching = false;
        state.error = true;
      },
      //DELETE USERS
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
     //UPDATE USERS
     updateUserStart: (state) => Object.assign(state, {
      isFetching: true,
      error: false
    }),
    updateUserSuccess: (state, action) => {
      state.isFetching = false
      state.users[state.users.findIndex(item => item._id === action.payload.user._id)] = action.payload.user
      state.error = false
    },
    updateUserFailure: (state) =>
      Object.assign(state, {
        isFetching: false,
        error: true
      }),
    //ADD USERS
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.post(action.payload.id);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
      },
    });

export const {loginStart, loginSuccess, loginFailure, getUserFailure, getUserStart, getUserSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, updateUserFailure, updateUserSuccess, updateUserStart, addUserFailure, addUserSuccess, addUserStart, logout} = userSlice.actions;
export default userSlice.reducer;