import * as Yup from 'yup'

const spouseValidationSchema = Yup.object({
    firstName: Yup.string().required('Please Enter FirstName').min(2, "FirstName Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "FirstName Must Start With a Letter"),
    lastName: Yup.string().required('Please Enter LastName').min(2, "LastName Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "FirstName Must Start With a Letter"),
    dateOfBirth: Yup.date().typeError('Date Of Birth Is required').required("Please enter date of birth").nullable(),
    aadharNumber: Yup.string()
        .required("Please enter addhar number")
        .matches(/^[0-9]+$/, "Please enter numbers only")
        .min(12, "Addhar Number Must Be 12 Digits"),
    address: Yup.string().required('Please Enter Address'),
    gender: Yup.string().required('Please Enter Gender'),
    relation: Yup.string().required("Relation is required"),
    image: Yup.mixed().required("Image is required"),
}).required()

export default spouseValidationSchema


