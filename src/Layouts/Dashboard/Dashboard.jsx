
import Sidebar from "@/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto ml-20 px-4 md:px-10  xl:px-20">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;