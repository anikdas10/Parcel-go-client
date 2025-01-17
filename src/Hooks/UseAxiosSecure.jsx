import axios from "axios";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const UseAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use((config)=>{
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `bearer ${token}`;
      return config;
    },(error)=>{
        console.log(error);
        return Promise.reject(error);
    })
    axiosSecure.interceptors.response.use((response)=>{ 
      return response;  
    },async(err)=>{
        const status = err.response.status;
        console.log(status);
        if(status === 401 || status === 403)
        {
          await logOut();
          navigate("/login");  
        }
        return Promise.reject(err);
    })
   return axiosSecure; 
};

export default UseAxiosSecure;