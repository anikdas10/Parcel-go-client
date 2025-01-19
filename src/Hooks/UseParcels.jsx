import { useQuery } from "@tanstack/react-query";

import UseAxiosPublic from "./UseAxiosPublic";


const UseParcels = (email) => {
   const axiosPublic = UseAxiosPublic();
  const {data:parcels,isLoading,refetch} = useQuery({
    queryKey:[email],
    queryFn:async()=>{
        const res = await axiosPublic.get(`/booking/${email}`);
        return res.data
    }
  })
   return [parcels,isLoading,refetch];
};

export default UseParcels;