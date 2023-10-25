import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
const AdminLayout = () => {
  // eslint-disable-next-line no-unused-vars
  let getToken = localStorage.getItem("token");
  return getToken ? (
    <>
      <Header />
      <h1>hello</h1>
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to={"/admin/login"} />
  );
};

export default AdminLayout;
