import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import UseBooking from "@/Hooks/UseBooking";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaBox, FaTruck, FaUsers } from "react-icons/fa6";


const Statistics = () => {
    const [totalParcels,setTotalParcels] = useState(0);
    const [totalDelivered,setTotalDelivered] = useState(0);
    const [totalUsers,setTotalUsers] = useState(0);
    const axiosPublic = UseAxiosPublic();
    useEffect(()=>{
        parcels();
        delivered();
        users();
    },[])

    const parcels = async()=>{
        try{
            const {data} = await axiosPublic.get("/bookingCount");
            // console.log(data);
            setTotalParcels(data?.count)
        }
        catch(err){
            console.log(err);
        }
    }
    const users = async()=>{
        try{
            const {data} = await axiosPublic.get("/allUsers");
            // console.log(data);
            setTotalUsers(data?.count)
        }
        catch(err){
            console.log(err);
        }
    }
    const delivered = async()=>{
        try{
            const {data} = await axiosPublic.get("/deliveredCount");
            // console.log(data);
            setTotalDelivered(data?.count)
        }
        catch(err){
            console.log(err);
        }
    }
    return (
      <div className="pt-16">
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-3xl">
          Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4 mt-10 px-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center flex-col gap-4 border">
            <FaBox className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-xl font-bold">Parcels Booked</h2>
              <p className="text-3xl font-semibold text-center">
                <CountUp end={totalParcels} duration={5} /> +
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center flex-col gap-4 border">
            <FaTruck className="text-4xl text-green-500" />
            <div className="text-center">
              <h2 className="text-xl font-bold">Parcels Delivered</h2>
              <p className="text-3xl font-semibold text-center">
                <CountUp end={totalDelivered} duration={5} /> +
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center flex-col gap-4 border">
            <FaUsers className="text-4xl text-purple-500" />
            <div className="text-center">
              <h2 className="text-xl font-bold">Registered Users</h2>
              <p className="text-3xl font-semibold text-center">
                <CountUp end={totalUsers} duration={5} /> +
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Statistics;