import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import adminValidationSchema from "../schemas/Admin/AdminSchema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(adminValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/admin/login", data);

      const token = response.headers.authorization;
      console.log(token);

      dispatch(setLogin({ token }));
      toast.success("Login Successfully !");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset();
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          color: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={2} sx={{ width: "500px" }}>
          <Box mt={4}>
            <Typography variant="h4" color="purple" textAlign={"center"} p={2}>
              Welcome Admin
            </Typography>
          </Box>

          <Box m={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    {...register("password", {
                      required: "Please Enter password",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminLogin;
