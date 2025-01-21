import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAllUser = (role) => {
    const axiosSecure = UseAxiosSecure();
    const {
      data: users,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: [role],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/user/${role}`);
        return data;
      },
    });
    return [users,isLoading,refetch];
};

export default UseAllUser;