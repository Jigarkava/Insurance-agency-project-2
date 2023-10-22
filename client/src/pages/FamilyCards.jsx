import { Box, Button } from "@mui/material";
import Cards from "../components/Cards";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"

const FamilyCards = () => {
  const navigate = useNavigate();

  const data = useSelector((state) => state.formData)
  console.log(data);

  const dependentsData = useSelector((state) => state.formData.dependents)
  console.log("dependentsData", dependentsData.length);

  const handleFirst = () => {
    if (dependentsData.length >= 5) {
      toast.error('You Can Not Add more than 5 Mebmbers')
    } else {
      navigate('/children-form')
    }
  };

  const handleSecond = () => {
    if (dependentsData.length >= 5) {
      toast.error('You Can Not Add more than 5 Mebmbers')
    } else {
      navigate('/spouse-form');
    }
  };

  const handleThird = () => {
    if (dependentsData.length >= 5) {
      toast.error('You Can Not Add more than 5 family Mebmbers')
    } else {
      navigate('/parent-form');
    }
  };

  return (
    <>
      <Box
        height={"100vh"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >

        <Cards name={"CHILDREN"} imgname={Logo} onAdd={handleFirst} />
        <Cards name={"SPOUSE"} imgname={Logo} onAdd={handleSecond} />
        <Cards name={"PARENTS"} imgname={Logo} onAdd={handleThird} />

        <Button variant="contained" onClick={() => navigate('/view_applicants_info')}>Proceed</Button>

      </Box>
    </>
  );
};

export default FamilyCards;
