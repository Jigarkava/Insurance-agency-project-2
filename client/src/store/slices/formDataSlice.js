import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

let initialState = {
  dependents: [],
};

export const postClientData = createAsyncThunk(
  "postClientData",
  async (dispatch) => {
    console.log(dispatch);
    try {
      const response = await api.post("/agent/customer", dispatch);
      console.log("response: " + response.data);
      toast.success("Data Sent to Admin Successfully");
      localStorage.removeItem("agentId");
      return response;
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
);

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addApplicantData: (state, action) => {
      state.applicant = action.payload;
    },

    addDependentsData: (state, action) => {
      const { aadharNumber } = action.payload;
      action.payload.aadharNumber = parseInt(aadharNumber);
      state.dependents.push(action.payload);
    },

    editDependentData: (state, action) => {
      const { dependentId, updatedData } = action.payload;

      console.log(dependentId, updatedData);

      updatedData.aadharNumber = parseInt(updatedData.aadharNumber);

      const index = state.dependents.findIndex(
        (dependent) => dependent.dependentId === updatedData.dependentId
      );

      if (
        index !== undefined &&
        index >= 0 &&
        index < state.dependents.length
      ) {
        state.dependents[index] = {
          ...state.dependents[index],
          ...updatedData,
        };
      }
    },

    deleteDependent: (state, action) => {
      const dependentId = action.payload;
      state.dependents = state.dependents.filter(
        (dependent) => dependent.dependentId !== dependentId
      );
    },

    clearAllData: (state) => {
      state.applicant = {};
      state.dependents = [];
    },
  },
});

export const {
  addApplicantData,
  addDependentsData,
  editDependentData,
  deleteDependent,
  proceedAllData,
  clearAllData,
} = formDataSlice.actions;

export default formDataSlice.reducer;
