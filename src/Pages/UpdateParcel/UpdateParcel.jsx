import useAuth from "@/Hooks/UseAuth";

import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "react-notifications-component";
import { useParams } from "react-router-dom";


const UpdateParcel = () => {
    const [parcel,setParcel] = useState([])
    const {id} = useParams();
    const {user} = useAuth();
     const [price, setPrice] = useState(0);
    const axiosSecure = UseAxiosSecure();
    const {handleSubmit,register,
        formState:errors
    } = useForm();
    console.log(id);
    useEffect(()=>{
        axiosSecure.get(`/bookings/${id}`)
        .then(res=>{
            setParcel(res.data)
        })
    },[])

     const handleParcelWeight = (value) => {
       const parcelWeight = parseFloat(value) || 0;

       if (parcelWeight === 0) {
         setPrice(0);
       }
       if (parcelWeight <= 1 && parcelWeight > 0) {
         setPrice(50);
       }
       if (parcelWeight === 2) {
         setPrice(100);
       }
       if (parcelWeight > 2) {
         setPrice(150);
       }
     };
    const onsubmit =async formData =>{
        formData.price = price;
        formData.status = parcel.status;
        formData.bookingDate = parcel.bookingDate;
        console.log(formData);
        try{
            const {data} = await axiosSecure.put(`/booking/${id}`,formData);
            console.log(data);
            if(data.modifiedCount>0)
            {
              Store.addNotification({
                message: "Parcel Update Successful!!",
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
    console.log(parcel);
    return (
      <div>
        <h2>Update Parcel</h2>
        <div className="w-full mb-5">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center gap-4 ">
                <div className="space-y-6 w-full">
                  {/* Name */}
                  <div className="space-y-1 text-sm">
                    <label htmlFor="name" className="block text-gray-600">
                      Name
                    </label>
                    <input
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("name", { required: true })}
                      id="name"
                      type="text"
                      value={user?.displayName}
                      readOnly
                    />
                  </div>
                  {/* email */}
                  <div className="space-y-1 text-sm">
                    <label htmlFor="category" className="block text-gray-600 ">
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("email", { required: true })}
                      id="email"
                      type="email"
                      value={user?.email}
                      readOnly
                    />
                  </div>
                  {/* phone Number */}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Phone Number
                    </label>

                    <input
                      defaultValue={parcel?.phoneNumber}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("phoneNumber", { required: true })}
                      id="phoneNumber"
                      type="number"
                      placeholder="Write Your Phone Number"
                    />
                  </div>
                  {/* Parcel Type */}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Parcel Type
                    </label>

                    <input
                      defaultValue={parcel?.parcelType}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("parcelType", { required: true })}
                      id="parcelType"
                      type="text"
                      placeholder=" Parcel Type"
                    />
                  </div>
                  {/* parcel Weight */}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Parcel Weight (Kg)
                    </label>

                    <input
                      defaultValue={parcel?.parcelWeight}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("parcelWeight", {
                        onChange: (e) => handleParcelWeight(e.target.value),
                        min: { value: 0, message: "Please Enter Valid Weight" },
                      })}
                      id="parcelWeight"
                      type="number"
                      placeholder="Parcel Weight (Kg)"
                    />
                    {errors.parcelWeight && (
                      <p className="text-red-400">
                        {errors.parcelWeight.message}
                      </p>
                    )}
                  </div>
                  {/*receivers Name */}
                  <div className="space-y-1 text-sm">
                    <label htmlFor="name" className="block text-gray-600">
                      Receivers Name
                    </label>
                    <input
                      defaultValue={parcel?.receiverName}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("receiverName", { required: true })}
                      id="receiverName"
                      type="text"
                      placeholder=" Receivers Name"
                    />
                  </div>
                </div>
                <div className="space-y-6 w-full">
                  {/*receivers phone Number */}
                  <div className="space-y-1 text-sm">
                    <label htmlFor="number" className="block text-gray-600">
                      Receiver's Phone Number
                    </label>

                    <input
                      defaultValue={parcel?.receiverPhoneNumber}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      id="receiverPhoneNumber"
                      {...register("receiverPhoneNumber", { required: true })}
                      type="number"
                      placeholder="Write Receiver's Phone Number"
                    />
                  </div>
                  {/* Parcel Type */}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Requested Delivery Date
                    </label>
                    <input
                      defaultValue={parcel?.deliveryDate}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("deliveryDate", {
                        required: true,
                        validate: {
                          notPast: (value) =>
                            new Date(value) >= new Date() ||
                            "Please Enter a valid date!",
                        },
                      })}
                      id="deliveryDate"
                      type="date"
                      placeholder=" Requested Delivery Date"
                    />
                    {errors.deliveryDate && (
                      <p style={{ color: "red" }}>
                        {errors.deliveryDate.message}
                      </p>
                    )}
                  </div>
                  {/* Parcel Type */}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Parcel Delivery Address
                    </label>
                    <input
                      defaultValue={parcel?.deliveryAddress}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("deliveryAddress", { required: true })}
                      id="deliveryAddress"
                      type="text"
                      placeholder=" Parcel Delivery Address"
                    />
                  </div>
                  {/*  Delivery Address Latitude*/}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Delivery Address Latitude
                    </label>

                    <input
                      defaultValue={parcel?.latitude}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("latitude", { required: true })}
                      id="latitude"
                      type="text"
                      placeholder="Delivery Address Latitude"
                    />
                  </div>
                  {/*   Delivery Address longitude*/}
                  <div className="space-y-1 text-sm">
                    <label
                      htmlFor="description"
                      className="block text-gray-600"
                    >
                      Delivery Address longitude
                    </label>

                    <input defaultValue={parcel?.longitude}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("longitude", { required: true })}
                      id="longitude"
                      type="text"
                      placeholder="Delivery Address Longitude"
                    />
                  </div>
                  {/* Price */}
                  <div className="space-y-1 text-sm">
                    <label htmlFor="price" className="block text-gray-600 ">
                      Price
                    </label>
                    <input defaultValue={parcel?.price}
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("price", { required: true })}
                      id="price"
                      type="text"
                      value={price}
                      readOnly
                      placeholder="Price "
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
                >
                  Book
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateParcel;