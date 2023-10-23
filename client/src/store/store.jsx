import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import formDataSlice from "./slices/formDataSlice";
import applicantSlice from "./slices/applicantSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    formData: formDataSlice,
    applicant: applicantSlice,
  },
});

export default store;
