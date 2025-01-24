import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseBooking from "@/Hooks/UseBooking";
import { useParams } from "react-router-dom";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
const Checkout = () => {
    const {id} = useParams();
    const [parcel,isLoading] = UseBooking(id);
    console.log(parcel?.price);
    if(isLoading)
    {
        return <LoadingSpinner/>
    }
    return (
      <div className="pt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center">
          Checkout
        </h2>
        <div className="text-center mt-10 space-y-4">
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Total Payable :{" "}
            <span className="font-bold ">{parcel?.price} Tk</span>
          </h3>
          {/* checkoutForm */}
          <Elements stripe={stripePromise}>
            {/* form Component */}
            <CheckOutForm price={parcel?.price} id={parcel?._id} />
          </Elements>
        </div>
      </div>
    );
};

export default Checkout;