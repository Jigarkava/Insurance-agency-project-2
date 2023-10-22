import {
  Login,
  // Children_Form,
  Applicant_Form,
  // Parents_Form,
  // Spouse_Form,
  FamilyCards,
  ViewApplicantDetails,
  LandingPage,
} from "../pages";
import { Routes, Route } from "react-router-dom";
import Dependent_Form from "../pages/Forms/Dependent_Form";

const AgentRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route
        path="/children-form"
        element={
          <Dependent_Form formName={"Children"} relationShipName={"Child"} />
        }
      />
      <Route
        path="/spouse-form"
        element={
          <Dependent_Form formName={"Spouse"} relationShipName={"Spouse"} />
        }
      />
      <Route
        path="/parent-form"
        element={
          <Dependent_Form formName={"Parent"} relationShipName={"Parent"} />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/applicant-form" element={<Applicant_Form />} />
      <Route path="/family-member" element={<FamilyCards />} />
      {/* <Route path="/children-form" element={<Children_Form />} />
      <Route path="/spouse-form" element={<Spouse_Form />} />
      <Route path="/parent-form" element={<Parents_Form />} /> */}
      <Route path="/view_applicants_info" element={<ViewApplicantDetails />} />
    </Routes>
  );
};

export default AgentRoutes;
