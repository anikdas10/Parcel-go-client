import useAuth from "@/Hooks/UseAuth";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import { set } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "react-notifications-component";


const BookParcel = () => {
    const [price,setPrice] = useState(0);
    const {user} = useAuth();
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const axiosSecure = UseAxiosSecure();
    
    const handleParcelWeight = value =>{
        
     const parcelWeight = parseFloat(value) || 0;
      
      if(parcelWeight===0)
      {
        setPrice(0)
      }
      if(parcelWeight<=1 && parcelWeight>0)
      {
        setPrice(50)
      }
      if(parcelWeight===2 )
      {
        setPrice(100)
      }
      if(parcelWeight>2)
      {
        setPrice(150)
      }
      
    }
    // form data
    const onsubmit = async(formData) => {
      console.log(formData);
      formData.status = "pending";
      formData.price = price;
      formData.bookingDate = new Date().toISOString().split("T")[0];
      
      
    //   save the data to the database
     try{
        const {data} =await axiosSecure.post("/booking",formData)
        
        if (data.insertedId) {
          Store.addNotification({
            message: "Parcel booking Successful!!",
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
    };
    console.log(new Date().toISOString().split("T")[0]);
    return (
      <div className="pt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-5">
          Book a Parcel
        </h2>
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

                    <input
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
                    <input
                      className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      {...register("price", { required: true })}
                      id="price"
                      type="number"
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

export default BookParcel;