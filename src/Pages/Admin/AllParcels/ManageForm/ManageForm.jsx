
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Store } from "react-notifications-component";
const ManageForm = ({parcel}) => {
    const axiosSecure = UseAxiosSecure();
    const {data:deliveryMens,isLoading} = useQuery({
        queryKey:["deliveryMen"],
        queryFn:async ()=>{
            const { data } = await axiosSecure.get("/user/DeliveryMen");
            
            return data;
        }
    })
      const handleSubmit =async (e) => {
        e.preventDefault();
        const form = e.target;
        const deliveryManId = form.deliveryMenId.value;
        const approximateDate = form.approximateDate.value;
        const updateInfo = {
          deliveryManId,
          approximateDate,
          status: "On The Way",
        };

        const { data } = await axiosSecure.patch(`/booking/${parcel?._id}`,updateInfo);
        console.log(data);
        if(data.modifiedCount>0)
        {
           Store.addNotification({
             message: "Booking Managed!!",
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
        
      }; 

      if(isLoading)
      {
        return <LoadingSpinner/>
      }
    return (
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              disabled={!(parcel.status === "pending")}
              className="px-2 py-1 bg-green-500 rounded-md text-white"
            >
              Manage
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg md:text-xl lg:text-2xl text-center">
                Manage Parcel
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-right text-lg">
                    Select Delivery Man
                  </label>
                  <select
                    id="deliveryMenId"
                    name="deliveryMenId"
                    required
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  >
                    {deliveryMens.map((deliveryMen) => (
                      <option key={deliveryMen._id} value={deliveryMen?._id}>
                        {deliveryMen?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-right text-lg">
                    Approximate delivery date
                  </label>
                  <input
                    type="date"
                    name="approximateDate"
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  />
                </div>
              </div>
              <div className=" w-full mt-3">
                <button className="bg-lime-500 px-10 py-3 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1 mx-auto">
                  Assign
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default ManageForm;