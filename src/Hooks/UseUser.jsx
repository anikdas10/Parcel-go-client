import { useQuery } from "@tanstack/react-query";

import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseUser = () => {

    const {user} = useAuth();
    
   const axiosSecure = UseAxiosSecure();
   const {data:parcels,refetch} = useQuery({
    queryKey:[user?.email],
    queryFn:async()=>{
        const { data } = await axiosSecure.get(`/booking/${user.email}`);
        return data;
    }
   })
   return [parcels,refetch];
};

export default UseUser;