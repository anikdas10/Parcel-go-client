import  { useState } from "react";
import logo from "../../assets/images/logo.png"

// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer, IoMdBookmarks } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";

import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import useAuth from "@/Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: "Home",
  },
  {
    icons: <FaProductHunt size={30} />,
    label: "Products",
  },
  {
    icons: <MdOutlineDashboard size={30} />,
    label: "Dashboard",
  },
  {
    icons: <CiSettings size={30} />,
    label: "Setting",
  },
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Log",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Report",
  },
];
const userItems = [
  {
    icons: <IoMdBookmarks size={30} />,
    label: "BookParcel",
    link: "/dashboard/bookParcel",
  },
  {
    icons: <IoMdBookmarks size={30} />,
    label: "MyParcels",
  },
  {
    icons: <FaUserCircle size={30} />,
    label: "MyProfile",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/${user.email}`);
      return data;
    },
  });
  console.log(userData?.role);
  return (
    <div
      className={`shadow-md h-screen p-2 absolute z-50 flex flex-col duration-500 md:static bg-blue-600 text-white  ${
        open ? "w-60 " : "w-16"
      }`}
    >
      {/* Header */}
      <div className=" px-3 py-2 h-20 flex justify-between items-center">
        <img
          src={logo}
          alt="Logo"
          className={`${open ? "w-10" : "w-0"} rounded-md`}
        />
        <div>
          <MdMenuOpen
            size={34}
            className={` duration-500 cursor-pointer ${!open && " rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Body */}

      <ul className="flex-1">
        {userData?.role === "Admin" &&
          menuItems.map((item, index) => {
            return (
              <li
                key={index}
                className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer  relative group"
              >
                <NavLink to="/" className="flex gap-2 items-center">
                  <div>{item.icons}</div>
                  <p
                    className={`${
                      !open && "w-0 translate-x-24"
                    } duration-500 overflow-hidden`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`${
                      open && "hidden"
                    } absolute left-32 shadow-md rounded-md
                         w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                        `}
                  >
                    <span>{item.label}</span>
                  </p>
                </NavLink>
              </li>
            );
          })}
        {userData?.role === "User" &&
          userItems.map((item, index) => {
            return (
              <li
                key={index}
                className="px-3 py-2 my-2 hover:bg-blue-800 rounded- relative group"
              >
                <NavLink
                  to={item.link}
                  className="md duration-300 cursor-pointer flex gap-2 items-center"
                >
                  <div>{item.icons}</div>
                  <p
                    className={` ${
                      !open && "w-0 translate-x-24"
                    } duration-500 overflow-hidden`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`${
                      open && "hidden"
                    } absolute left-32 shadow-md rounded-md
                         w-0 p-0 text-black bg-white duration-100 overflow-hidden 
                         group-hover:w-fit group-hover:p-2 group-hover:left-16
                        `}
                  >
                    <span>{item.label}</span>
                  </p>
                </NavLink>
              </li>
            );
          })}
      </ul>
      {/* footer */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="">
          <img src={user?.photoURL} className="full h-10 rounded-full" alt="" />
        </div>
        <div
          className={`leading-5 ${
            !open && "w-0 translate-x-24"
          } duration-500 overflow-hidden`}
        >
          <p>{user?.displayName}</p>
          <span className="text-xs">{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;