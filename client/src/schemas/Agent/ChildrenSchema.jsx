import * as Yup from "yup";

const childrenValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("Please Enter FirstName")
    .min(2, "FirstName Must Be At Least 2 Characters")
    .matches(
      /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
      "FirstName Must Start With a Letter"
    ),
  lastName: Yup.string()
    .required("Please Enter LastName")
    .min(2, "LastName Must Be At Least 2 Characters")
    .matches(
      /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
      "FirstName Must Start With a Letter"
    ),
  aadharNumber: Yup.string()
    .required("Please enter Aadhar Number")
    .matches(/^[0-9]+$/, "Please enter numbers only")
    .min(12, "Addhar Number Must Be 12 Digits"),
  address: Yup.string().required("Please Enter Address"),
  // dob: Yup.date()
  //   .required("Please enter date of birth")
  //   .typeError("Please Enter Date of Birth")
  //   .min(
  //     new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
  //     "You must be at Below 18 years old"
  //   ),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .typeError("Please Enter date of birth")
    .test(
      "age",
      "Age must be less than or equal to 18 years",
      (value) => new Date().getFullYear() - new Date(value).getFullYear() <= 18
    ),
  relation: Yup.string().required("Relation is required"),
  image: Yup.mixed().required("Image is required"),
}).required();

export default childrenValidationSchema;
