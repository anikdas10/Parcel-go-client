import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import BarChart from "./BarChart";
import LineChart from "./LineChart/LineChart";



const Statistics = () => {
    const axiosSecure = UseAxiosSecure();
     const dateCount = {};
        const {
          data: bookings, isLoading} = useQuery({
          queryKey: ["bookings"],
          queryFn: async () => {
            const {data} = await axiosSecure.get("/booking");
            return data;
          },
        });

        if(isLoading)
        {
            return <LoadingSpinner/>
        }

         bookings.map((booking) => {
           const date = booking.bookingDate;
           if (dateCount[date]) {
             dateCount[date].count++;
           } else {
             dateCount[date] = {
               bookingDate: date,
               count: 1,
               deliveredCount: 0,
             };
           }
           // Count the deliveries (assuming delivery info is present in the booking object)
           if (booking.status==="delivered") {
             dateCount[date].deliveredCount++;
           }
         });
        
         const result = Object.values(dateCount);
         console.log(result);
         console.log(bookings);
    return (
      <div className="pt-16">
        <h2 className="font-bold text-center  text-xl md:text-2xl lg:text-3xl">
          Statistics
        </h2>

        {/*  */}
        <div>
          <BarChart results={result} />
        </div>
        <div>
          <LineChart results={result} />
        </div>
      </div>
    );
};

export default Statistics;