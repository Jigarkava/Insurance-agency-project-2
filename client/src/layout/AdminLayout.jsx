import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
const AdminLayout = () => {
  // eslint-disable-next-line no-unused-vars
  // const { isAuthenticated, token } = useSelector((state) => state.auth);
  // console.log(token);
  // let getToken = localStorage.getItem("token");
  //
  // return getToken   ? (
  // token && isAuthenticated === true ? (
  return (
    <>
      <Header />
      <h1>hello</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
  // ) : (
  //   <Navigate to={"/admin/login"} />
  // );
};

export default AdminLayout;
