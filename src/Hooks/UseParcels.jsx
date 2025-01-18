import { useQuery } from "@tanstack/react-query";

import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseParcels = () => {
    const {user} = useAuth();
    console.log(user.email);
   const axiosSecure = UseAxiosSecure();
  const {data:parcels,isLoading,refetch} = useQuery({
    queryKey:[user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/booking/${user?.email}`);
        return res.data
    }
  })
   return [parcels,isLoading,refetch];
};

export default UseParcels;