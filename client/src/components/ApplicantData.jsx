import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Table.scss";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./ApplicantData.module.css";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import api from "../utils/api";

const ApplicantData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"))

  const handleView = (viewData) => {
    navigate(`view/${viewData}`);
  };

  useEffect(() => {
    fetchData(page, limit, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const fetchData = async (currentPage, currentLimit, searchTerms) => {
    try {
      const queryParams = {
        pageNumber: currentPage,
        limit: currentLimit,
        searchKey: searchTerms,
      };

      const response = await api.get("/admin/customer", {
        headers: {
          Authorization:token,
        },
        params: queryParams,
      });

      setData(response.data.customers);
      setTotalCount(response.data.count);
      setNoResults(response.data.customers.length === 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimit(newLimit);
  };

  const handleSearch = () => {
    fetchData(page, limit, searchTerm);
  };

  const pageCount = Math.ceil(totalCount / limit);

  return (
    <div style={{ marginTop: "80px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          columnGap: "10px",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {noResults ? (
        <p>No search results found</p>
      ) : (
        <table cellSpacing={0}>
          <thead className={classes.tblHeader}>
            <th className={classes.theader}>AgentCode</th>
            <th className={classes.theader}>Name Of Client</th>
            <th className={classes.theader}>No Of People Covered</th>
            <th className={classes.theader}>Application Date</th>
            <th className={classes.theader}>Status</th>
            <th className={classes.theader}>View</th>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <hr />
              </td>
            </tr>
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item?.agentId}</td>
                <td>
                  {item?.firstName} {item?.lastName}
                </td>
                <td>{item?.dependents.length + 1}</td>
                <td>{item?.createdAt.substring(0, 10)}</td>
                <td>
                  <Chip
                    label={item.isActive ? "Approved" : "Pending"}
                    color={item.isActive ? "success" : "error"}
                  />
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(item._id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={classes.tblPage}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        <label className={classes.pageLabel}>Rows per page: </label>
        <Select onChange={handleLimitChange} value={limit}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default ApplicantData;
