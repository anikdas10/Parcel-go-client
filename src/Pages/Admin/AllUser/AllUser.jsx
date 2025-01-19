import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NumberOfParcels from "./NumberOfParcels";
import { Store } from "react-notifications-component";


const AllUser = () => {
    const axiosSecure = UseAxiosSecure();
   
    const { data: users, isLoading,refetch } = useQuery({
      queryKey: ["Users"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/user/User");
        return data;
      },
    });

     
    // make deliverymen
    const makeDeliveryMen =async (user)=>{
        console.log(user.email);
        const updateItem = {
          role: "DeliveryMen",
        };
        const {data} = await axiosSecure.patch(`/users/${user.email}`,updateItem);
        if(data.modifiedCount>0)
        {
            Store.addNotification({
              message: `${user.name} is now DeliveryMen!!`,
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
        }

    }
    // make admin
    const makeAdmin = async(user) =>{
         console.log(user.email);
         const updateItem = {
           role: "Admin",
         };
         const { data } = await axiosSecure.patch(
           `/users/${user.email}`,
           updateItem
         );
         
         refetch();
         if (data.modifiedCount > 0) {
           Store.addNotification({
             message: `${user.name} is now  Admin!!`,
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
         }
    }
     if(isLoading)
     {
        return <LoadingSpinner/>
     }
    return (
      <div>
        <h2>All User</h2>
        <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead className=" dark:bg-gray-300 bg-orange-400">
                <tr className="text-center  py-4 ">
                  <th className="px-3 py-4  rounded-tl-lg">User’s Name </th>
                  <th className="p-3">User’s Phone</th>

                  <th className="p-3">Number of Parcel Booked</th>
                  <th className="p-3">Total Spent Amount</th>
                  <th className="p-3">Action</th>
                  <th className="p-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="text-center border-b  border-opacity-20 dark:border-gray-300 dark:bg-gray-100 md:text-sm xl:text-lg"
                  >
                    <td className="px-2 py-6 text-center">
                      <span>{user.name}</span>
                    </td>
                    <td className="p-2 text-center">
                      <span></span>
                    </td>
                    <td className="p-2">
                      <span>
                        <NumberOfParcels email={user?.email} />
                      </span>
                    </td>
                    <td className="p-2">
                      <span>{user?.deliveryDate}</span>
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={()=>makeDeliveryMen(user)}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        Make DeliveryMen
                      </button>
                    </td>
                    <td className="py-2">
                      <button onClick={makeAdmin}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        Make Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default AllUser;