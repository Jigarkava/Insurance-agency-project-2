import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getClientById, approveClient } from "../store/slices/applicantSlice";

const ApplicantReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientDetails } = useSelector((state) => state.applicant);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getClientById(id));
  };

  const handleApprove = (id) => {
    dispatch(approveClient(id)).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <Box sx={{ backgroundColor: "#eef2f6" }}>
      <Box mb={4}>
        <div style={{ marginTop: "60px", backgroundColor: "#ffffff" }}>
          <Box sx={{ backgroundColor: "#001128eb", p: 2, textAlign: "center" }}>
            <Typography color={"White"} variant="h4">
              Applicant Information
            </Typography>
          </Box>

          <Grid container spacing={2} p={1} style={{ marginTop: "15px" }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                First Name:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.firstName}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Last Name:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.lastName}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Date of Birth:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.dateOfBirth}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Aadhar Number:
              </Typography>
              <Typography
                variant="body1"
                color="#333333"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.aadharNumber}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Gender:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.gender}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Address:
              </Typography>

              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {clientDetails?.address}
              </Typography>
            </Grid>

            <Grid item sm={8}>
              <Typography variant="h6" color="#008080">
                Image:
              </Typography>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  width: "190px",
                }}
              >
                <img
                  src={clientDetails?.image}
                  alt="User Image"
                  style={{ maxWidth: "300px" }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>

      {clientDetails?.dependents?.length > 0 && (
        <Box
          mt={3}
          sx={{ backgroundColor: "#001128", p: 2, textAlign: "center" }}
        >
          <Typography color={"White"} variant="h4">
            Dependent Information
          </Typography>
        </Box>
      )}

      {clientDetails?.dependents?.map((dependent) => (
        <div
          key={dependent._id}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            padding: "18px",
          }}
        >
          <Grid container spacing={2} p={1}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                First Name:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.firstName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Last Name:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.lastName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Date of Birth:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.dateOfBirth}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Aadhar Number:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.aadharNumber}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Gender:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.gender}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Address:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.address}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="#008080">
                Relation:
              </Typography>
              <Typography
                variant="body1"
                color="#444444"
                sx={{ marginLeft: 1 }}
              >
                {dependent.relation}
              </Typography>
            </Grid>
          </Grid>

          <img
            src={dependent.image}
            alt="Dependent Image"
            style={{
              maxWidth: "300px",
              marginTop: "20px",
              marginLeft: "10px",
            }}
          />
        </div>
      ))}

      <Button
        onClick={() => handleApprove(clientDetails._id)}
        variant="contained"
        color={"success"}
        style={{ margin: "10px" }}
      >
        Approve Form
      </Button>
    </Box>
  );
};

export default ApplicantReport;
