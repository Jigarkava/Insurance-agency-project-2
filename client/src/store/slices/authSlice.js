import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const adminLogin = createAsyncThunk("adminLogin", async (data) => {
  console.log(data);
  const response = await api.post("/admin/login", data);
  alert("Second");
  return response;

  // const token = response.headers.authorization;
  // localStorage.setItem("token", JSON.stringify(token));
  // toast.success("Login Successful");
  // try {
  // } catch (error) {
  //   toast.error(error.response.data.message);
  // }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      console.log(action.payload.token);
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
