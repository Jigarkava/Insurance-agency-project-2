import * as Yup from 'yup'

const applicantValidationSchema = Yup.object({
    firstName: Yup.string().required('Please Enter FirstName').min(2, "FirstName Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "FirstName Must Start With a Letter"),
    lastName: Yup.string().required('Please Enter LastName').min(2, "LastName Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "FirstName Must Start With a Letter"),
    dateOfBirth: Yup.date().typeError('Please Enter Date Of Birth').required("Please enter date of birth").test(
        "min",
        "Age must be greater than or equal to 18 years",
        (value) => new Date().getFullYear() - new Date(value).getFullYear() >= 18
    ).test("max", "Age is always less than 65 years", (value) => new Date().getFullYear() - new Date(value).getFullYear() <= 65).nullable(),
    aadharNumber: Yup.string()
        .required("Please Enter Addhar Number")
        .matches(/^[0-9]+$/, "Please Enter Numbers Only")
        .min(12, "Addhar Number Must Be 12 Digits"),
    address: Yup.string().required('Please Enter Address'),
    image: Yup.mixed().required('Please Enter Image')
})

export default applicantValidationSchema
