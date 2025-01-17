import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useAuth from "@/Hooks/UseAuth";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) return <LoadingSpinner />;
    if (user) return children;
    return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;