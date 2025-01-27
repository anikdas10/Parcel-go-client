import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";




const TopDeliveryMan = () => {
    const axiosPublic = UseAxiosPublic();

    const {data:topDeliveryMans,isLoading} = useQuery({
        queryKey:["topDeliveryMans"],
        queryFn:async()=>{
            const { data } = await axiosPublic.get("/topDeliveryMen");
            return data
        }
    })

    if(isLoading)
    {
       return <LoadingSpinner/>
    }
    
    return (
      <div className="pt-16">
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-3xl">
          Top DeliveryMan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {topDeliveryMans.map((deliveryman) => (
            <div
              key={deliveryman._id}
              className="w-full rounded-md shadow-md border p-6 "
            >
              <img
                src={deliveryman.image}
                alt=""
                className="object-cover object-center h-80 lg:h-[360px] xl:h-[400px] w-full rounded-md  dark:bg-gray-500"
              />
              <div className="mt-6 mb-2">
                <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
                  Name:{deliveryman.name}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <h3>
                  <span className="block text-sm font-medium tracking-widest dark:text-violet-600">
                    Parcel Delivered: {deliveryman.totalParcels}
                  </span>
                </h3>
                <h3>
                  <span className="block text-sm font-medium tracking-widest dark:text-violet-600">
                    Rating : {deliveryman.averageRating.toFixed(2)}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default TopDeliveryMan;