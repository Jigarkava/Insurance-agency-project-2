import { Box, Typography, Button } from "@mui/material";
// eslint-disable-next-line react/prop-types
const Cards = ({ imgname, name, onAdd }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fffffff4",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "300px",
        width: "300px",
        boxShadow: 2,
        borderRadius: 3,
        p: 4,
      }}
    >
      <img src={imgname} height={100} width={150} alt="Logo" />

      <Typography variant="h5" color="purple">
        {name}
      </Typography>

      <Button fullWidth variant="contained" color="primary" onClick={onAdd}>
        Add
      </Button>
    </Box>
  );
};

export default Cards;
