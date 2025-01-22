
import Sidebar from "@/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className=" container  ">
          <Outlet />
        </div>
      </div>
    );
};

export default Dashboard;