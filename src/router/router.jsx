
import Login from "@/Authentication/Login";
import SignUp from "@/Authentication/SignUp";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import Home from "@/Pages/Home/Home";
import Dashboard from "@/Layouts/Dashboard/Dashboard"
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Pages/BookParcel/BookParcel";
import MyParcel from "@/Pages/MyParcel/MyParcel";
import UpdateParcel from "@/Pages/UpdateParcel/UpdateParcel";
import Profile from "@/Shared/Profile/Profile";
import AllParcels from "@/Pages/Admin/AllParcels/AllParcels";
import AllUser from "@/Pages/Admin/AllUser/AllUser";
import AllDeliveryMen from "@/Pages/Admin/AllDeliveryMen/AllDeliveryMen";
import MyDeliveryList from "@/Pages/DeliveryMen/DeliveryList/MyDeliveryList";
import Review from "@/Pages/DeliveryMen/Reviews/Review";
import DeliveryMenRoute from "./DeliveryMenRoute";
import AdminRoute from "./AdminRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "bookParcel",
        element: (
          <PrivateRoute>
            <BookParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "myParcel",
        element: (
          <PrivateRoute>
            <MyParcel />
          </PrivateRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <PrivateRoute>
            <UpdateParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // admin route
      {
        path: "allParcels",
        element: (
          <AdminRoute>
            <AllParcels />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "allDeliveryMen",
        element: (
          <AdminRoute>
            <AllDeliveryMen />
          </AdminRoute>
        ),
      },
      // delivery Men
      {
        path: "myDeliveryList",
        element: (
          <DeliveryMenRoute>
            <MyDeliveryList />
          </DeliveryMenRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <DeliveryMenRoute>
            {" "}
            <Review />
          </DeliveryMenRoute>
        ),
      },
    ],
  },
]);

export default router;