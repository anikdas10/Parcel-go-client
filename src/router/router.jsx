
import Login from "@/Authentication/Login";
import SignUp from "@/Authentication/SignUp";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import Home from "@/Pages/Home/Home";
import Dashboard from "@/Layouts/Dashboard/Dashboard"
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Pages/BookParcel/BookParcel";


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
    ],
  },
]);

export default router;