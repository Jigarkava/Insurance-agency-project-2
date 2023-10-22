/* eslint-disable react/prop-types */
// import Children_Form from "./Forms/Children_Form";
// import Parents_Form from './Forms/Parents_Form'
// import Spouse_Form from './Forms/Spouse_Form';
import { useNavigate } from "react-router-dom";
import { deleteDependent } from "../store/slices/formDataSlice";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import "./Table.scss";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Table = ({ data, applicant_information }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (editDetails) => {
    console.log(editDetails);
    if (editDetails.relationShip === "Child") {
      // <Children_Form childrenDetails={editDetails} />
      navigate("/children-form", { state: { dependentDetails: editDetails } });
    } else if (editDetails.relationShip === "Parent") {
      // <Parents_Form parentDetails={editDetails} />
      navigate("/parent-form", { state: { dependentDetails: editDetails } });
    } else if (editDetails.relationShip === "Spouse") {
      // <Spouse_Form spouseDetails={editDetails} />
      navigate("/spouse-form", { state: { dependentDetails: editDetails } });
    } else {
      navigate("/applicant-form", { state: { applicantDetails: editDetails } });
      // toast.error('path not found')
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    if (id !== undefined) {
      dispatch(deleteDependent(id));
    }
  };

  console.log(data);
  console.log(applicant_information);
  console.log(applicant_information?.firstName);

  return (
    <table cellSpacing={0}>
      <thead>
        <th>FIRST NAME</th>
        <th>LAST NAME</th>
        <th>DATE OF BIRTH</th>
        <th>GENDER</th>
      </thead>

      <tbody>
        <tr>
          <td colSpan={6}>
            <hr />
          </td>
        </tr>

        {applicant_information && (
          <>
            <tr>
              <td>{applicant_information?.firstName}</td>
              <td>{applicant_information?.lastName}</td>
              <td>{applicant_information?.dateOfBirth}</td>
              <td>{applicant_information?.gender}</td>
              <td>
                <Button
                  size="small"
                  onClick={() => handleView(applicant_information)}
                  variant="outlined"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </td>
            </tr>
          </>
        )}

        {data?.map((curelem, index) => (
          <tr key={index}>
            <td>{curelem?.firstName}</td>
            <td>{curelem?.lastName}</td>
            <td>{curelem?.dateOfBirth}</td>
            <td>{curelem?.gender}</td>
            <td>
              {/* <button onClick={() => handleView(curelem)}>+</button> */}
              <Button
                size="small"
                onClick={() => handleView(curelem)}
                variant="outlined"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </td>
            <td className="deleteBtn">
              <Button
                size="small"
                onClick={() => handleDelete(curelem.dependentId)}
                color="error"
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
              >
                Delete
              </Button>
              {/* <button onClick={() => handleDelete(curelem.dependentId)}>-</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
