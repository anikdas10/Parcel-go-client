import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseBooking = (id) => {
     const axiosSecure = UseAxiosSecure();
     const { data: parcel, isLoading } = useQuery({
       queryKey: ["booking"],
       queryFn: async () => {
         const { data } = await axiosSecure.get(`/bookings/${id}`);
         return data;
       },
     });
     return [parcel, isLoading];
};

export default UseBooking;