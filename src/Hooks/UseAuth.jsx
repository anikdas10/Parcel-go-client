import { AuthContext } from "@/Providers/AuthProvider";
import { useContext } from "react";


const useAuth = () => {
    const context = useContext(AuthContext);
    return context
};

export default useAuth;