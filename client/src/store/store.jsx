import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import formDataSlice from "./slices/formDataSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    formData: formDataSlice
  },
});

export default store;
