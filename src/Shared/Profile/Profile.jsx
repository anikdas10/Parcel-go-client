import useAuth from "@/Hooks/UseAuth";
import cover from "../../assets/images/cover.jpg"
import UseUser from "@/Hooks/UseUser";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { imageUpload } from "@/components/api/utilies";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";


const Profile = () => {
    const { user, updateUser,setUser ,setLoading} = useAuth();
    const [userData] = UseUser();
    const [buttonText,setButtonText] = useState("Select Image");
    const axiosSecure = UseAxiosSecure();
    const handleSubmit =async e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
         const  image= form.image.files;
            const imageFiles = {image:image[0]};
          
            // image link form the imageBB
            const photoUrl = await imageUpload(imageFiles);
            console.log(photoUrl,name);
            // update Profile
           await updateUser(name, photoUrl);
           setUser({ ...user, displayName: name, photoURL: photoUrl });
           setLoading(false);
        //    update from the database
        const updatedData ={
            name:name,
            image:photoUrl
        }
        const {data} = await axiosSecure.patch(`/users/${user?.email}`,updatedData)
        console.log(data);
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
          <img
            alt="cover photo"
            src={cover}
            className="w-full mb-4 rounded-t-lg h-56"
          />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user.photoURL}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
              {userData?.role}
            </p>
            <p className="mt-2 text-xl font-medium text-gray-800 ">
              User Id: {user.uid}
            </p>
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">
                    {user.displayName}
                  </span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">{user.email}</span>
                </p>

                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-lime-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1">
                        Update Profile
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="font-bold text-lg md:text-xl lg:text-2xl text-center">
                          Edit profile
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-right text-lg"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              name="name"
                              required
                              defaultValue={user?.displayName}
                              className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label>
                              <input
                                onChange={(e) =>
                                  setButtonText(e.target.files[0].name)
                                }
                                className="text-sm cursor-pointer w-full hidden"
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                hidden
                              />
                              <div className=" border border-gray-300 rounded font-semibold cursor-pointer py-3 px-2">
                                {buttonText}
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className=" w-full mt-3">
                          
                            <button className="bg-lime-500 px-10 py-3 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1 mx-auto">
                              Update Profile
                            </button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;