import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

console.log(token);
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization: token,
  },
});

export default api;
