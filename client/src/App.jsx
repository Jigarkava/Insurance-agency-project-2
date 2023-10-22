// import { useEffect, useState } from "react";
import AdminRoutes from "./routes/AdminRoutes";
import AgentRoutes from './routes/AgentRoutes'; 
// import { useNavigate } from "react-router-dom";

function App() {  

// const [token,setToken] = useState()
// const navigate = useNavigate()

// useEffect(()=>{
//   const getToken = localStorage.getItem('token');
//   setToken(getToken);
// },[]);


  return (
    <>

    {/* {!token ?  <AgentRoutes/> : navigate('/admin/login') }     */}
    <AgentRoutes/>
    <AdminRoutes/>
    </>
  );
}

export default App;
