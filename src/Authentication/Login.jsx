import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle/LoginWithGoogle";
import useAuth from "@/Hooks/UseAuth";
import { Store } from "react-notifications-component";
import { useState } from "react";


const Login = () => {
  const [error,setError] = useState("");
  const {signIn} = useAuth();
 const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from?.pathname || "/";
  const handleSubmit = async e =>{
    e.preventDefault();
    const form = e.target;
    const email= form.email.value;
    const password= form.password.value;

    try{
      const result = await signIn(email,password);
      navigate(from,{replace:true})
      Store.addNotification({
        message: "Login SuccessFull!",
        type: "success",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
      setError("");
    }
    catch(err){
      setError("Invalid email or password!");
    }

  }
    return (
      <div className="pt-20">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 mx-auto">
          <h2 className="mb-5 text-3xl font-semibold text-center ">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
           
            <div className="space-y-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
                name="email"
              />
            </div>
            <div className="space-y-2 mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
                name="password"
              />
            </div>
            {
              error && <div>
                <p className="text-red-600">{error}</p>
              </div>
            }

            <div className="">
              <button className="w-full border px-8 py-3 font-semibold rounded-md  mt-5 dark:bg-violet-600 dark:text-gray-50">
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>
          <div className="my-6 space-y-4">
            <button className="w-full">
              <LoginWithGoogle />
            </button>
          </div>
          <div>
            <p className="text-xs md:text-sm  lg:text-lg text-center sm:px-6 dark:text-gray-600">
              Don't have an account?
              <Link state={{from:location}}
                to="/signUp"
                rel="noopener noreferrer"
                className="underline dark:text-gray-800 "
              >
                signUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;