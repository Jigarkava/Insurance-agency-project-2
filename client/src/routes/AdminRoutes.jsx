import { Routes, Route } from "react-router-dom";
import { AdminLayout, AdminLogin, ApplicantReport } from "../layout";
import ApplicantData from "../components/ApplicantData";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminLayout />}>
        <Route index element={<ApplicantData />} />
        <Route path="view/:id" element={<ApplicantReport />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
