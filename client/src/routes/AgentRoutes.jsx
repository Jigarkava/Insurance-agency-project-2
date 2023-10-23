import {
  Login,
  Applicant_Form,
  FamilyCards,
  ViewApplicantDetails,
  LandingPage,
} from "../pages";
import { Routes, Route } from "react-router-dom";
import Dependent_Form from "../pages/Forms/Dependent_Form";

const AgentRoutes = () => {
  const childrenMenu = ["Son", "Daughter"];
  const spouseMenu = ["Husband", "Wife"];
  const parentMenu = ["Father", "Mother"];

  return (
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route
        path="/children-form"
        element={
          <Dependent_Form
            formName={"Children"}
            relationShipName={"Child"}
            menuOption={childrenMenu}
          />
        }
      />
      <Route
        path="/spouse-form"
        element={
          <Dependent_Form
            formName={"Spouse"}
            relationShipName={"Spouse"}
            menuOption={spouseMenu}
          />
        }
      />
      <Route
        path="/parent-form"
        element={
          <Dependent_Form
            formName={"Parent"}
            relationShipName={"Parent"}
            menuOption={parentMenu}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/applicant-form" element={<Applicant_Form />} />
      <Route path="/family-member" element={<FamilyCards />} />
      <Route path="/view_applicants_info" element={<ViewApplicantDetails />} />
    </Routes>
  );
};

export default AgentRoutes;
