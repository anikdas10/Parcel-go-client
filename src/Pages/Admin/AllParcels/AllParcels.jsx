

import UseAxiosSecure from "@/Hooks/UseAxiosSecure";

import ManageForm from "./ManageForm/ManageForm";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";


const AllParcels = () => {
    
    const axiosSecure = UseAxiosSecure();
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [bookings,setBookings] = useState([]);

    useEffect(()=>{
        const facingData = async ()=>{
             const { data } = await axiosSecure.get(
               `/booking?startDate=${startDate}&endDate=${endDate}`
             );
             setBookings(data);
        }
        facingData();
    },[startDate,endDate])
   
    //form submit data
    const handleFormSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;
        setStartDate(startDate);
        setEndDate(endDate);
    }
    return (
      <div className="pt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-8">
          All Parcels
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className=" flex items-center justify-center gap-3">
            <div className="space-y-2">
              <label className="text-right text-lg">From</label>
              <input
                type="date"
                name="startDate"
                className="w-full px-2 lg:px-4 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-right text-lg">To</label>
              <input
                type="date"
                placeholder="Requested Delivery Date"
                name="endDate"
                className="w-full  px-2 lg:px-4 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="">.</label>
              <button className="bg-lime-500  px-2 lg:px-4 py-2 rounded-md cursor-pointer text-white hover:bg-lime-800  flex items-center gap-2 mx-auto">
                Search <FaMagnifyingGlass />
              </button>
            </div>
          </div>
        </form>
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