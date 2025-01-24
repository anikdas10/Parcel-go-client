import { Link } from "react-router-dom";
import logo from "./../assets/images/logo.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import useAuth from "@/Hooks/UseAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UseUser from "@/Hooks/UseUser";


const NavBar = () => {
  const {user,logOut} = useAuth();
  // console.log(user?.displayName);
  const [userData] = UseUser();
  // console.log(userData?.role);
  const handleLogout = async()=>{
    const result = await logOut();
  }
    return (
      <div className="fixed w-full top-0 z-50 border-b py-2 shadow-md">
        <nav className="w-11/12 mx-auto flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center">
            <img src={logo} className="w-10" alt="" />
            <h3 className="font-bold text-lg md:text-xl">Parcel.Go</h3>
          </div>
          <div className="flex items-center gap-3">
            <Link className="font-semibold md:text-lg" to="/">
              {" "}
              Home
            </Link>
            <Link className="text-xl" to="/">
              <IoMdNotificationsOutline />
            </Link>
            {user ? (
              <>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <img
                        src={user?.photoURL}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuLabel>
                        <h2 className="font-bold text-lg">
                          {user?.displayName}
                        </h2>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          className="font-semibold"
                          to={
                            userData?.role === "Admin"
                              ? "/dashboard/statistics"
                              : userData?.role === "User"
                              ? "/dashboard/profile"
                              : "dashboard/myDeliveryList"
                          }
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={handleLogout}
                          className="font-semibold"
                        >
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link className="font-semibold md:text-lg " to="/login">
                  {" "}
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    );
};

export default NavBar;