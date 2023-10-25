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
    console.log(payload);
    try {
      const response = await api.get("/admin/customer", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getClientById = createAsyncThunk("getClientById", async (id) => {
  try {
    const response = await api.get(`/admin/customer/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const approveClient = createAsyncThunk("approveClient", async (id) => {
  try {
    const response = await api.put(`/admin/customer/${id}`);
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
      state.alldata = action.payload;
    });

    builder.addCase(getClientById.fulfilled, (state, action) => {
      state.clientDetails = action.payload;
    });
  },
});

export default applicantSlice.reducer;
