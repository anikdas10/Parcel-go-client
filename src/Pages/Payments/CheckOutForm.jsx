
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckOutForm.css";
import { useEffect, useState } from "react";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import useAuth from "@/Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({price,id}) => {
    const [clientSecret,setClientSecret] = useState("");
    const [err,setErr]= useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
 const {user} = useAuth();
 const navigate = useNavigate();
  useEffect(()=>{

 getPaymentIntent();

  },[price])

  const getPaymentIntent = async ()=>{
    try{
        const { data } = await axiosSecure.post(
          "/create-payment-intent",
          {price}
        );
        setClientSecret(data.clientSecret);
    }
    catch(err){
        console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
     
      setErr(error.message);

    } else {
      setErr("");
    }

    // confirm payment 
     const { paymentIntent, error: confirmError } =
       await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: card,
           billing_details: {
             name: user?.displayName,
             email: user?.email,
           },
         },
       });

       if (confirmError) {
         
       } else {
         if (paymentIntent.status === "succeeded") {
          
            const { data } = await axiosSecure.patch(`/booking/${id}`,{paymentStatus:"paid"});
            console.log(data);
            navigate("/dashboard/success");
         }
       }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
     <p className="mt-3 text-red-400 text-lg">{err}</p>
      <button type="submit" className="px-8 py-3 bg-green-500 rounded-md text-lg md:text-xl lg:text-2xl text-white mt-5" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;