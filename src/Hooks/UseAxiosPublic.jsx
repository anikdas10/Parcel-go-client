import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://parcel-go-server.vercel.app",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
