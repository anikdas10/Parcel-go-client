import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useAuth from "@/Hooks/UseAuth";
import UseUser from "@/Hooks/UseUser";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [userData,isLoading] = UseUser();
    const location = useLocation();
    if(loading || isLoading)
    {
        return <LoadingSpinner/>;
    }
    if(user && userData?.role==="Admin")
    {
        return children;
    }

    return <Navigate to="/" state={{from:location}} replace="true"></Navigate>
};

export default AdminRoute;