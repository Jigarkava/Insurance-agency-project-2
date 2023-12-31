import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidationSchema from "../../schemas/Agent/LoginSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addApplicantData } from "../../store/slices/formDataSlice";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAgentId = localStorage.getItem("agentId");
    if (getAgentId) {
      navigate("/applicant-form");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("agentId", JSON.stringify(data.agentId));
    console.log(data);
    dispatch(addApplicantData({ agentId: data.agentId }));
    reset();
    navigate("/applicant-form", { replace: true });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#eef2f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          elevation={2}
          sx={{
            width: "510px",
            backgroundColor: "#ffffff",
          }}
        >
          <Box m={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item sm={12}>
                  <Typography
                    variant="h4"
                    color="purple"
                    textAlign={"center"}
                    p={2}
                  >
                    Welcome Agent
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...register("firstname")}
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register("lastname")}
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    label="Agent Code"
                    {...register("agentId")}
                    error={!!errors.agentId}
                    helperText={errors.agentId?.message}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
