import NavBar from "@/assets/Shared/NavBar";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div>
            <NavBar/>
            <h2>Main layout</h2>
            <Outlet/>
        </div>
    );
};

export default MainLayout;