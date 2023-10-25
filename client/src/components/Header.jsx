import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/admin/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 45px",
        height: "80px",
        backgroundColor: "white",
        alignItems: "center",
        boxShadow: 3,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        position: "fixed",
        mb: 80,
      }}
    >
      <Box>
        <Link to="/dashboard">
          <img src={Logo} alt="Logo" height={60} width={80} />
        </Link>
      </Box>

      <Box>
        <Button onClick={handleLogOut} variant="contained" color="primary">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
