import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle/LoginWithGoogle";
import { imageUpload } from "@/components/api/utilies";
import useAuth from "@/Hooks/UseAuth";
import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import { Store } from "react-notifications-component";


const SignUp = () => {
  const {createUser,updateUser,setUser} = useAuth();
  const axiosPublic = UseAxiosPublic();
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const  image= form.image.files;
    const imageFiles = {image:image[0]};
  
    // image link form the imageBB
    const photoUrl = await imageUpload(imageFiles);

    const userInfo = {
      name,
      email,
      role,
      image:photoUrl
    }
    // create user
    try{
      const {user} = await createUser(email,password)
      // update user
      await updateUser(name, photoUrl);
      setUser({ ...user, displayName: name ,photoURL:photoUrl});

      // notification  message
      Store.addNotification({
        
        message: "Sign Up Successful!!",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
      // save the data (mongodb)
     const {data} =  await axiosPublic.post("/users",userInfo)
     console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }
    return (
      <div className="pt-20">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 mx-auto">
          <h2 className="mb-5 text-3xl font-semibold text-center ">SignUp</h2>

          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <label className="">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
                name="name"
              />
            </div>
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
            <div className="space-y-2">
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Role
                </label>
              </div>
              <select
                name="role"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              >
                <option value="User">User</option>
                <option value="DeliveryMen">DeliveryMen</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className=" p-2  w-full  m-auto rounded-lg flex-grow">
                <div className="file_upload py-3 relative border-gray-300 rounded-lg">
                  <div className="">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-full hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className=" border border-gray-300 rounded font-semibold cursor-pointer p-1 px-">
                        Select Image
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-6">
              <button className="w-full border px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                Sign Up
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
              Already have an account?
              <Link
                to="/login"
                rel="noopener noreferrer"
                className="underline dark:text-gray-800 "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default SignUp;