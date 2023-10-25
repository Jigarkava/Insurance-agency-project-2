/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import applicantValidationSchema from "../../schemas/Agent/ApplicantSchema";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantData } from "../../store/slices/formDataSlice";
import { useEffect } from "react";

const Applicant_Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const applicantDetails = state?.applicantDetails;

  let agentId = useSelector((state) => state?.formData?.applicant?.agentId);

  useEffect(() => {
    const getAgentId = JSON.parse(localStorage.getItem("agentId"));
    if (getAgentId === undefined || getAgentId === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    // ! pre fill form
    defaultValues: applicantDetails,
    resolver: yupResolver(applicantValidationSchema),
  });

  const image = watch("image");

  const onDrop = (acceptedFiles) => {
    let selectedFile = acceptedFiles[0];

    // base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setValue("image", reader.result);
      trigger("image");
    };
    console.log(selectedFile);
    trigger("image");
  };

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const removeImage = () => {
    setValue("image", null);
    trigger("image");
  };

  const onSubmit = (data) => {
    data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split("T")[0];
    console.log(data);
    // ! set agentId
    agentId ? (data.agentId = agentId) : undefined;
    // ! convert string to number
    data.aadharNumber = parseInt(data.aadharNumber);

    dispatch(addApplicantData(data));
    toast.success("Data Saved SuccessFully");
    reset();
    // navigate("/family-member");
    applicantDetails !== undefined
      ? navigate("/view_applicants_info")
      : navigate("/family-member");
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid p={3} container spacing={2}>
          <Grid item sm={12}>
            <Typography variant="h3" textAlign={"center"} color={"purple"}>
              Applicant Details
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Divider>
              <Typography variant="h6">User Information:</Typography>
            </Divider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhar Number"
              {...register("aadharNumber")}
              error={!!errors.aadharNumber}
              helperText={errors.aadharNumber?.message}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Date Of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("dateOfBirth")}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
                defaultValue={applicantDetails?.gender || "Male"}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio {...register("gender")} />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio {...register("gender")} />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              rows={3}
              multiline
              fullWidth
              label="Address"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item sm={12}>
            {!image && (
              <>
                <label>Upload Image:</label>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Typography variant="body1">
                    Drag and drop some Images here, or click to select Images
                  </Typography>
                </Box>
              </>
            )}

            {errors.image ? (
              <FormHelperText error>{errors.image?.message}</FormHelperText>
            ) : null}
          </Grid>

          <Grid item sm={10} border={0}>
            {image && (
              <>
                <Typography variant="body1" color="initial">
                  Uploded Image
                </Typography>
                <Box
                  sx={{
                    p: "3px",
                  }}
                >
                  <img width={"250px"} src={image} alt="Preview" />
                  <Typography mt={1} mb={1} variant="body2" color="initial">
                    {image.name}
                  </Typography>
                  <Button
                    mt={"10px"}
                    color="error"
                    variant="outlined"
                    onClick={removeImage}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              sx={{ pl: 3, pr: 3 }}
              variant="contained"
              color="primary"
            >
              {applicantDetails !== undefined ? "Update" : "Continue"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Applicant_Form;
