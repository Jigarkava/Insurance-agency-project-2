import { Box, Grid, Typography, Divider, TextField, Button, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import parentValidationSchema from '../../schemas/Agent/ParentsSchema'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from '@reduxjs/toolkit'
import {
    addDependentsData,
    editDependentData,
    // deleteDependent,
} from "../../store/slices/formDataSlice";

const Parents_Form = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { state } = useLocation()

    const parentDetails = state?.parentDetails
    console.log(parentDetails);

    const dependentId = parentDetails?.dependentId
    console.log(dependentId);

    const dependents = useSelector((state) => state?.formData?.dependents)

    const { register, handleSubmit, reset, watch,
        setValue,
        trigger,
        formState: { errors }, } = useForm(
            {
                mode: 'all',
                defaultValues: parentDetails,
                resolver: yupResolver(parentValidationSchema),
            }
        )

    const image = watch("image");

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];

        // base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            console.log(reader.result);
            setValue("image", reader.result);
            trigger("image")
        };
        trigger("image");
    };

    const { getInputProps, getRootProps } = useDropzone({
        onDrop,
    });

    const removeImage = () => {
        setValue("image", null);
        trigger('image')

    };

    const onSubmit = (data) => {

        if (dependentId !== undefined) {

            data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split("T")[0];
            data.relationShip = "Parent";
            dispatch(editDependentData({ dependentId, updatedData: data }));
            toast.success("Data Updated Successfully");
            navigate("/view_applicants_info");

        } else {

            if (dependents.length >= 5) {
                toast.error('You Can Not Add more than 5 Mebmbers')
                navigate('/view_applicants_info')
                return
            }

            data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split("T")[0];
            data.relationShip = 'Parent'
            data.dependentId = nanoid()

            dispatch(addDependentsData(data))
            toast.success('Data Saved SuccessFully')
            reset()
            navigate('/applicants_info')
        }
    }

    const handleAddMore = (data) => {
        if (dependents.length >= 5) {
            toast.error('You Can Not Add more than 5 Mebmbers')
            navigate('/view_applicants_info')
            return
        }

        data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split("T")[0];
        data.dependentId = nanoid()
        data.relationShip = 'Parent'

        dispatch(addDependentsData(data))
        navigate("/family-member")
    }

    return (
        <Box>
            <form>
                <Grid p={3} container spacing={2}>

                    {dependentId !== undefined && <h1>{dependentId}</h1>}

                    <Grid item sm={12}>
                        <Typography variant="h3" textAlign={'center'} color={'purple'}>
                            Parent Details
                        </Typography>
                    </Grid>

                    <Grid item sm={12} mb={2}>
                        <Divider>
                            <Typography
                                variant="h6"
                            >
                                User Information:
                            </Typography>
                        </Divider>
                    </Grid>

                    <Grid item xs={12} md={4} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            {...register("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} md={4} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...register("lastName")}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} md={4} sm={6}>
                        <TextField
                            fullWidth
                            label="Aadhar Number"
                            {...register("aadharNumber")}
                            error={!!errors.aadharNumber}
                            helperText={errors.aadharNumber?.message}
                            inputProps={{ maxLength: 12 }}
                        />
                    </Grid>



                    <Grid item xs={12} md={4} sm={6} mt={0.5}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label="Date Of Birth"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("dateOfBirth")}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth?.message}
                        />
                    </Grid>


                    <Grid item xs={12} md={4} sm={6} mt={0.5} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Relation With Main Member
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Relation With Main Member"
                                {...register("relation")}
                                value={watch("relation")}
                                onChange={(e) => setValue("relation", e.target.value)}
                                error={!!errors.relation}
                            >
                                <MenuItem value={"Father"}>Father</MenuItem>
                                <MenuItem value={"Mother"}>Mother</MenuItem>
                            </Select>
                            {errors.relation && (
                                <FormHelperText error>
                                    {errors.relation?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} sm={6} mt={0.5}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Male"
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel value="Male" control={<Radio {...register('gender')} />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio {...register('gender')} />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12} >
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



                    <Grid item sm={12} md={6}>
                        {!image ? (
                            <>
                                <Box
                                    sx={{
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
                        ) :
                            <>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'center',
                                }}>
                                    <img
                                        width={"180px"}
                                        src={image}
                                        alt="Preview"
                                    />
                                    <Button
                                        mt={"10px"}
                                        sx={{ height: 'fit-content' }}
                                        color="error"
                                        variant="outlined"
                                        onClick={removeImage}
                                    >
                                        Delete
                                    </Button>
                                </Box>

                            </>

                        }

                        {errors.image ? (
                            <FormHelperText error>{errors.image?.message}</FormHelperText>
                        ) : null}

                    </Grid>

                    <Box sx={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        mt: 2
                    }}>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            sx={{ pl: 3, pr: 3 }}
                            variant="contained"
                            color="primary"
                        >
                            {dependentId ? "Update" : "Continue"}
                        </Button>

                        {dependentId === undefined && (
                            <>
                                <Button
                                    onClick={handleSubmit(handleAddMore)}
                                    sx={{ pl: 3, pr: 3 }}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Add More
                                </Button>
                            </>
                        )}
                    </Box>

                </Grid>
            </form>
        </Box>
    );
};

export default Parents_Form