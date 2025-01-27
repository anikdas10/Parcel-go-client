import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useAuth from "@/Hooks/UseAuth";
import UseUser from "@/Hooks/UseUser";
import { Navigate, useLocation } from "react-router-dom";


const DeliveryMenRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [userData, isLoading] = UseUser();
  const location = useLocation();
  if (loading || isLoading) {
    return <LoadingSpinner />;
  }
  if (user && userData?.role === "DeliveryMen") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace="true"></Navigate>;
};

export default DeliveryMenRoute;