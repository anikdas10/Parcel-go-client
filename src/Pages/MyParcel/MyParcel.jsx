import useAuth from "@/Hooks/UseAuth";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const MyParcel = () => {
    const {user} = useAuth();
    const [userParcel,setUserParcel] = useState([]);
    const axiosSecure = UseAxiosSecure();

   useEffect(()=>{
    const loadParcel = async ()=>{
        const {data} = await axiosSecure.get(`/booking/${user?.email}`)
        setUserParcel(data);
    }
    loadParcel();
   },[])
   console.log(userParcel);
    return (
      <div className="pt-10 mx-auto">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center">
          My Parcel
        </h2>
        <div>
          <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 overflow-hidden">
            <h2 className="mb-3 text-2xl font-semibold leading-tight">
              Standings
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="rounded-t-lg dark:bg-gray-300 bg-orange-400">
                  <tr className="text-center py-4 ">
                    <th className="p-3 text-left">Parcel Type</th>
                    <th className="p-3 text-left">Requested Delivery Date</th>
                    <th className="p-3">Approximate Delivery Date</th>
                    <th className="p-3">Booking Date</th>
                    <th className="p-3">Delivery Men ID</th>
                    <th className="p-3">Booking Status</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Review</th>
                    <th className="p-3">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {userParcel.map((parcel, index) => (
                    <tr
                      key={index}
                      className="text-center border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100"
                    >
                      <td className="p-2 text-center">
                        <span>{parcel.parcelType}</span>
                      </td>
                      <td className="p-2 text-center">
                        <span>{parcel.deliveryDate}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.approximateDate}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.bookingDate}</span>
                      </td>
                      <td className="p-2">
                        <span>{parcel?.deliveryManId}</span>
                      </td>
                      <td className="p-2 text-center">
                        <span>{parcel.status}</span>
                      </td>
                      <td className="py-2">
                        <Link to="/dashboard/update">
                          <button
                            disabled={!(parcel.status === "pending")}
                            className="px-2 py-1 bg-green-500 rounded-md text-white"
                          >
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="p-2">
                        <button
                          disabled={!(parcel.status === "pending")}
                          className="px-2 py-1 bg-red-500 rounded-md text-white"
                        >
                          cancel
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          disabled={!(parcel.status === "delivered")}
                          className="px-2 py-1 bg-green-500 rounded-md text-white "
                        >
                          Review
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          disabled={!(parcel.status === "canceled")}
                          className="px-2 py-1 bg-green-500 rounded-md text-white "
                        >
                          Pay
                        </button>
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

export default MyParcel;