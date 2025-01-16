import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";
import useAuth from "./UseAuth";


const UseUser = () => {

    const {user} = useAuth();
    
   const axiosPublic = UseAxiosPublic();
   const {data:userData,refetch} = useQuery({
    queryKey:["user"],
    queryFn:async()=>{
        const {data} = await axiosPublic.get(`/users/${user.email}`);
        return data;
    }
   })
   return [userData,refetch];
};

export default UseUser;