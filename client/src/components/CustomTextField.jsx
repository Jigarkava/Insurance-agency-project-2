/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

const CustomTextField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const error = !!errors[name];
  const helperText = errors[name]?.message || "";

  return (
    <>
      <TextField
        fullWidth
        label={label}
        {...register(name)}
        error={error}
        helperText={helperText}
      />

      <Button variant="contained" color="primary">

      </Button>
    </>
  );
};

export default CustomTextField;
