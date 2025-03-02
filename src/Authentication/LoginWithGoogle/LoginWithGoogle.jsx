import useAuth from "@/Hooks/useAuth";
import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const LoginWithGoogle = () => {
  const {  handleGoogleLogin } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async ()=>{
    try{
      const {user} = await handleGoogleLogin();
        navigate(from);
      const userInfo = {
        name:user.displayName,
        email:user.email,
        image:user.photoURL,
        role:"User"
      }
      const {data} = await axiosPublic.post("/users",userInfo);
      
    }
    catch(err){
      console.log(err);
    }
  }
  
    return (
      <div onClick={handleLogin}>
        <button
          aria-label="Login with Google "
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Login with Google</p>
        </button>
      </div>
    );
};

export default LoginWithGoogle;