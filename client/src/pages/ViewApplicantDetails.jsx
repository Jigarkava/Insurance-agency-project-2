/* eslint-disable no-unused-vars */
import { Box, Typography, Button } from "@mui/material";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { clearAllData, postClientData } from "../store/slices/formDataSlice";
import { useNavigate } from "react-router-dom";

const ViewApplicantDetails = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const dependentsData = useSelector((state) => state.formData.dependents);
  const applicantData = useSelector((state) => state?.formData?.applicant);

  const allData = useSelector((state) => state.formData);
  console.log(allData);

  const childData = dependentsData.filter(
    (elem) => elem.relationShip === "Child"
  );

  const spouseData = dependentsData.filter(
    (elem) => elem.relationShip === "Spouse"
  );

  const parentData = dependentsData.filter(
    (elem) => elem.relationShip === "Parent"
  );

  const finalData = () => {
    const updateDependents = (dependents) => {
      return dependents.map((dependent) => {
        const updatedDependent = { ...dependent };

        if (updatedDependent.image && updatedDependent.image.src) {
          updatedDependent.image = updatedDependent.image.src;
        }

        return updatedDependent;
      });
    };

    const updatedData = {
      ...allData,
      ...applicantData,
    };

    if (dependentsData.length > 0) {
      updatedData.dependentList = updateDependents(allData.dependents);

      delete updatedData.dependents;

      updatedData.dependentList = updatedData.dependentList.map((dependent) => {
        const { dependentId, ...newDependent } = dependent;
        return newDependent;
      });
    }

    delete updatedData.applicant;

    return updatedData;
  };

  const handleProceed = () => {
    const updatedData = finalData();

    dispatch(postClientData(updatedData))
      .then(() => {
        console.warn("ok");
        dispatch(clearAllData());
        naviagte("/");
      })
      .catch(() => {
        console.warn("res");
      });
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Box
          sx={{
            zIndex: 1000,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#003366",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Typography textAlign={"center"} variant="h5" color="white">
            ALL APPLICANT DETAILS
          </Typography>
        </Box>

        <Box p={2} mt={6}>
          {
            //! applicant data
            applicantData !== undefined && (
              <>
                <h2>Applicant Details</h2>
                <Table applicant_information={applicantData} />
              </>
            )
          }

          {
            // ! children data
            childData.length >= 1 && (
              <>
                <h2>Children Details</h2>
                <Table data={childData} />
              </>
            )
          }

          {
            //! parentData
            parentData.length >= 1 && (
              <>
                <h2>Parent Details</h2>
                <Table data={parentData} />
              </>
            )
          }

          {
            // ! spouseData
            spouseData.length >= 1 && (
              <>
                <h2>Spouse Details</h2>
                <Table data={spouseData} />
              </>
            )
          }
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          mt: 3,
          p: 2,
        }}
      >
        <Button
          onClick={() => handleProceed()}
          variant="contained"
          color="primary"
        >
          Proceed
        </Button>
      </Box>
    </>
  );
};

export default ViewApplicantDetails;
