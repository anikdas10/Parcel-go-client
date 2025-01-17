import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import useAuth from "./UseAuth";


const UseUser = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = useAuth();
     const { data: userData } = useQuery({
       queryKey: ["user"],
       queryFn: async () => {
         const { data } = await axiosSecure.get(`/users/${user.email}`);
         return data;
       },
     });
     return [userData]
};

export default UseUser;