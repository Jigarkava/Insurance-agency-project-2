import { Navigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

const PrivateRoutes = () => {
    let auth = { token: true }
    return (
        auth.token ? <AdminLayout /> : <Navigate to={'/admin/login'} />
    )
}

export default PrivateRoutes