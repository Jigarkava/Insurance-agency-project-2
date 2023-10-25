import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

const initialState = {
  alldata: [],
  clientDetails: [],
};

export const getApplicantData = createAsyncThunk(
  "getApplicantData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/customer", {
        params: payload,
      });
      console.log(response.data);
      alert("ok");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getClientById = createAsyncThunk("getClientById", async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/admin/customer/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const approveClient = createAsyncThunk("approveClient", async (id) => {
  console.log(id);
  try {
    console.log("start");
    const response = await api.put(`/admin/customer/${id}`);
    console.log("response", response);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const applicantSlice = createSlice({
  name: "getApplicantDataslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicantData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.alldata = action.payload;
    });

    builder.addCase(getClientById.fulfilled, (state, action) => {
      console.log(action.payload);
      state.clientDetails = action.payload;
    });

    builder.addCase(approveClient.fulfilled, (state, action) => {
      console.log(state.alldata);
      console.log(action.payload);
    });
  },
});

export default applicantSlice.reducer;
