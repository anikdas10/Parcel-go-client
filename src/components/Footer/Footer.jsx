import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import image from "../../assets/images/logo.png";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  
  return (
    <div className="bg-[#0A1828] border-t border-gray-400 mt-16">
      <div className="container grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
        <div className="w-24 md:w-32 lg:w-40 mx-auto md:col-span-2 lg:col-span-3">
          <img src={image} className="w-full" alt="" />
        </div>
        <div>
          <ul className="text-white font-semibold text-sm md:text-lg lg:text-xl space-y-4">
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact Us</li>
            <li className="cursor-pointer">Privacy Policy</li>
            <li className="cursor-pointer">Return & Refund Policy</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="font-bold text-white text-lg md:text-xl lg:text-2xl">
           Address
          </h2>
          <h4 className="text-white">
            House: 113, Road: 2, South Bishil,
            <br /> Miurpur-1, Dhaka-1216
          </h4>
          <h4 className="text-white font-semibold text-lg">
            Phone:+8801719999999
          </h4>
          <h4 className="text-white font-semibold text-lg">
            Email:allsports@gmail.com
          </h4>
        </div>
        <div>
          <h2 className="text-white font-bold text-xl md:text-xl mb-3">
            Flow Us On:
          </h2>
          <div className="flex items-center gap-2 text-xl text-white md:text-2xl lg:text-3xl">
            <h2 className="cursor-pointer">
              <FaFacebook />
            </h2>
            <h2 className="cursor-pointer">
              <FaInstagramSquare />
            </h2>
            <h2 className="cursor-pointer">
              <CiTwitter />
            </h2>
            <h2 className="cursor-pointer">
              <FaYoutube />
            </h2>
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-gray-500 text-white">
        <h1 className="text-center text-sm md:text-lg w-2/3 mx-auto md:w-auto">
          Copyright {new Date().getFullYear()} © All Rights Reserved by Parcel.Go
        </h1>
      </div>
    </div>
  );
};

export default Footer;
