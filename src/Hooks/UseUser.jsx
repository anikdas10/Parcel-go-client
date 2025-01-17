import { useQuery } from "@tanstack/react-query";

import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseUser = () => {

    const {user} = useAuth();
    
   const axiosSecure = UseAxiosSecure();
   const {data:userData,refetch} = useQuery({
    queryKey:["user"],
    queryFn:async()=>{
        const {data} = await axiosSecure.get(`/users/${user.email}`);
        return data;
    }
   })
   return [userData,refetch];
};

export default UseUser;