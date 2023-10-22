import * as Yup from 'yup'

const LoginValidationSchema = Yup.object({
    agentId: Yup.string()
        .required('Enter Your Agent Code Here')
        .matches(/^[0-9]+$/, "Please enter numbers only")
})

export default LoginValidationSchema
