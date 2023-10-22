import * as Yup from "yup";

const adminValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Password"),
}).required();

export default adminValidationSchema;
