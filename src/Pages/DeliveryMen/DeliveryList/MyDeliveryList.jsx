import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Map from "@/components/Map/Map";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAuth from "@/Hooks/UseAuth";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import UseUser from "@/Hooks/UseUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const MyDeliveryList = () => {
    const [userData] = UseUser();
    const axiosSecure = UseAxiosSecure();

    const {data:bookings,isLoading,refetch} = useQuery({
        queryKey:["bookings"],
        queryFn:async()=>{
           const { data } = await axiosSecure.get(
             `/deliveryMenBooking/${userData._id}`
           );
           return data;
        }
    })
    
    // handlecancel
    const handleCancel = (id)=>{
        const updateItem = {
          status: "cancelled",
        };
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,Cancel It!",
        }).then(async(result) => {
          if (result.isConfirmed) {
             const {data} = await axiosSecure.patch(`/booking/${id}`,updateItem);
             if(data.modifiedCount>0)
             {
                refetch();
                 Swal.fire({
                   title: "Cancelled!",
                   icon: "success",
                 });
             }
           
          }
        });
    
    }
    const handleDeliver = (id)=>{
    const updateItem = {
      status: "delivered",
    }
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes,Deliver It!",
     }).then(async (result) => {
       if (result.isConfirmed) {
         const { data } = await axiosSecure.patch(`/booking/${id}`, updateItem);
         if (data.modifiedCount > 0) {
            refetch();
           Swal.fire({
             title: "Delivered!",
             icon: "success",
           });
         }
       }
     });

    }
    if(isLoading){
        return <LoadingSpinner/>
    }
  
    return (
      <div className="pt-10 border">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
          My Delivery List
        </h2>

        {/* table */}
        <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead className=" dark:bg-gray-300 bg-orange-400">
                <tr className="text-center  py-4 ">
                  <th className="px-3 py-4  rounded-tl-lg">
                    Booked User’s Name
                  </th>
                  <th className="p-3">Receivers Name</th>

                  <th className="p-3">Booked User’s Phone</th>
                  <th className="p-3">Requested Delivery Date</th>
                  <th className="p-3">Approximate Delivery Date</th>
                  <th className="p-3">Receivers phone number</th>
                  <th className="p-3">Receivers Address</th>
                  <th className="p-3">View Location</th>
                  <th className="p-3">Action</th>

                  <th className="p-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="text-center border-b  border-opacity-20 dark:border-gray-300 dark:bg-gray-100 md:text-sm xl:text-lg"
                  >
                    <td className="px-2 py-6 text-center">
                      <span>{booking.name}</span>
                    </td>
                    <td className="p-2 text-center">{booking.receiverName}</td>
                    <td className="p-2">{booking.phoneNumber}</td>
                    <td className="p-2">
                      <span>{booking?.deliveryDate}</span>
                    </td>
                    <td className="p-2">
                      <span>{booking?.approximateDate}</span>
                    </td>
                    <td className="p-2">
                      <span>{booking?.receiverPhoneNumber}</span>
                    </td>
                    <td className="p-2">
                      <span>{booking?.deliveryAddress}</span>
                    </td>
                    <td className="p-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="px-2 py-1 bg-green-500 rounded-md text-white">
                            Location
                          </button>
                        </DialogTrigger>
                        <DialogContent className="p-8">
                          <DialogTitle className="text-center">
                            Location
                          </DialogTitle>
                          <Map
                            latitude={booking?.latitude}
                            longitude={booking.longitude}
                            address={booking.deliveryAddress}
                          />
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={!(booking.status === "On The Way")}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        {booking.status === "cancelled"
                          ? "Cancelled"
                          : "Cancel"}
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeliver(booking._id)}
                        disabled={!(booking.status === "On The Way")}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        {booking.status === "delivered" ? "Delivered" : "Deliver"}
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

export default MyDeliveryList;