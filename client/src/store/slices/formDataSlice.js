import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  dependents: [],
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addApplicantData: (state, action) => {
      state.applicant = action.payload
    },

    addDependentsData: (state, action) => {

      console.log(action.payload);

      const { aadharNumber } = action.payload

      console.log(aadharNumber);

      action.payload.aadharNumber = parseInt(aadharNumber)

      state.dependents.push(action.payload)

      console.log(state.dependents);

      console.log(state);
    },

    editDependentData: (state, action) => {

      const { dependentId, updatedData } = action.payload;

      console.log(dependentId, updatedData);

      updatedData.aadharNumber = parseInt(updatedData.aadharNumber)

      const index = state.dependents.findIndex(dependent => dependent.dependentId === updatedData.dependentId)

      if (index !== undefined && index >= 0 && index < state.dependents.length) {

        state.dependents[index] = { ...state.dependents[index], ...updatedData };

      }
    },

    deleteDependent: (state, action) => {

      const dependentId = action.payload;

      const index = state.dependents.findIndex(dependent => dependent.dependentId === dependentId)

      if (index !== undefined && index >= 0 && index < state.dependents.length) {

        state.dependents.splice(index, 1);

      }
    },

  }
})

export const { addApplicantData, addDependentsData, editDependentData, deleteDependent, proceedAllData } = formDataSlice.actions

export default formDataSlice.reducer