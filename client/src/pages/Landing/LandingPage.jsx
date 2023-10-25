import { Box, Typography, Button } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#eef2f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "400px",
            width: "400px",
            backgroundColor: "white",
            padding: "15px",
            boxShadow: "2",
          }}
        >
          <img src={Logo} height={180} alt="not load " />

          <Typography
            variant="body2"
            fontSize={"15px"}
            textAlign={"center"}
            color={"black"}
          >
            At least be clear with your Insurance because the future is not
          </Typography>

          <Button
            onClick={() => navigate("/login", { replace: true })}
            sx={{ boxShadow: "6" }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
