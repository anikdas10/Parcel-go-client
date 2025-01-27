
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAuth from "@/Hooks/UseAuth";

import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import UseParcels from "@/Hooks/UseParcels";
import UseUser from "@/Hooks/UseUser";


import { Store } from "react-notifications-component";
import { Link } from "react-router-dom";


const MyParcel = () => {
  const {user} = useAuth();
  const [userData] = UseUser();
    const axiosSecure = UseAxiosSecure();
    const [parcels,isLoading,refetch] = UseParcels(user?.email);
//    useParcels
    
   const handleCancel =async id =>{
    
    const updateInfo = {
        status :"canceled"
    }
    try{
        const {data} = await axiosSecure.patch(`/booking/${id}`,updateInfo);
        refetch();
        console.log(data);
        if(data.modifiedCount>0)
        {
             Store.addNotification({
               message: "Parcel Cancelled!!",
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
    catch(err){
        console.log(err);
    }
   }

  //  review
  const handleReview = async (e)=>{
    e.preventDefault();
    const form = e.target;
    const reviewer = form.name.value;
    const reviewerImage = form.image.value;
    const rating = parseFloat(form.rating.value);
    const review = form.review.value;
    const deliveryMenId = form.deliveryMenId.value;
    
    const reviewContent = {
      reviewer,
      reviewerImage,
      rating,
      review,
      deliveryMenId,
      reviewDate: new Date().toLocaleDateString()
    };

    try{
      const {data} = await axiosSecure.post("/reviews",reviewContent)
      if(data.insertedId)
      {
          Store.addNotification({
            message: "Review given successfully!!",
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
    catch(err){
      console.log(err);
    }

  }
   if(isLoading)
   {
    return <LoadingSpinner/>
   }

  //  console.log(userData);
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
                  {parcels.map((parcel, index) => (
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
                        <Link to={`/dashboard/${parcel._id}`}>
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
                          onClick={() => handleCancel(parcel._id)}
                          disabled={!(parcel.status === "pending")}
                          className="px-2 py-1 bg-red-500 rounded-md text-white"
                        >
                          cancel
                        </button>
                      </td>
                      <td className="p-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              disabled={!(parcel.status === "delivered")}
                              className="px-2 py-1 bg-green-500 rounded-md text-white "
                            >
                              Review
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle className="text-center">
                              Give Review
                            </DialogTitle>
                            {/* form */}
                            <form onSubmit={handleReview}>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label
                                    htmlFor="name"
                                    className="text-right text-lg"
                                  >
                                    Name
                                  </label>
                                  <input
                                    id="name"
                                    name="name"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full px-2 py-1 md:px-4 md:py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="name"
                                    className="text-right text-lg"
                                  >
                                    Image
                                  </label>
                                  <input
                                    id="image"
                                    name="image"
                                    value={userData?.image}
                                    readOnly
                                    className="w-full px-2 py-1 md:px-4 md:py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="name"
                                    className="text-right text-lg"
                                  >
                                    Rating out of 5
                                  </label>
                                  <input
                                    id="rating"
                                    name="rating"
                                    type="text"
                                    className="w-full px-2 py-1 md:px-4 md:py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    placeholder="Give Rating"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="name"
                                    className="text-right text-lg"
                                  >
                                    FeedBack Text
                                  </label>
                                  <textarea
                                    id="review"
                                    name="review"
                                    placeholder=" FeedBack Text"
                                    className="w-full  px-2 py-1 md:px-4 md:py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor="name"
                                    className="text-right text-lg"
                                  >
                                    DeliveryMen Id
                                  </label>
                                  <input
                                    id="deliveryMenId"
                                    name="deliveryMenId"
                                    value={parcel?.deliveryManId}
                                    readOnly
                                    className="w-full px-2 py-1 md:px-4 md:py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                  />
                                </div>
                              </div>
                              <div className=" w-full mt-3">
                                <button className="bg-lime-500 px-10 py-3 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1 mx-auto">
                                  Give Review
                                </button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </td>
                      <td className="p-2">
                        <Link to={`/dashboard/checkOut/${parcel._id}`}>
                          <button
                            disabled={parcel?.paymentStatus === "paid" || parcel.status==="canceled"}
                            className="px-2 py-1 bg-green-500 rounded-md text-white "
                          >
                           {parcel?.paymentStatus==="paid"?"Paid":"Pay"}
                          </button>
                        </Link>
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