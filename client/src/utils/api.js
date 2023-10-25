import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    config.headers.authorization = token;
    return config;
  },
  function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: "http://localhost:8000",
  // headers: {
  //   authorization: token,
  // },
});

export default api;
