import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageForm from "./ManageForm/ManageForm";



const AllParcels = () => {
    
    const axiosSecure = UseAxiosSecure();

    const {data:bookings,isLoading} = useQuery({
        queryKey:["Parcels"],
        queryFn:async()=>{
            const {data} = await axiosSecure.get("/booking");
            return data;
        }
    })

    //form submit data

    if(isLoading)
    {
        return <LoadingSpinner/>
    }
    return (
      <div className="pt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
          All Parcels
        </h2>
        <div>
          <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 overflow-hidden ">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm">
                <thead className=" dark:bg-gray-300 bg-orange-400">
                  <tr className="text-center  py-4 ">
                    <th className="px-3 py-4  rounded-tl-lg">User’s Name </th>
                    <th className="p-3">User’s Phone</th>

                    <th className="p-3">Booking Date</th>
                    <th className="p-3">Requested Delivery Date</th>
                    <th className="p-3">Cost</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-tr-md">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((parcel, index) => (
                    <tr
                      key={index}
                      className="text-center border-b  border-opacity-20 dark:border-gray-300 dark:bg-gray-100 md:text-sm xl:text-lg"
                    >
                      <td className="px-2 py-6 text-center">
                        <span>{parcel.name}</span>
                      </td>
                      <td className="p-2 text-center">
                        <span>{parcel.phoneNumber}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.bookingDate}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.deliveryDate}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.price} Tk</span>
                      </td>
                      <td className="p-2 text-center">
                        <span>{parcel.status}</span>
                      </td>
                      <td className="py-2">
                        <ManageForm parcel={parcel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AllParcels;