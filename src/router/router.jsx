import MainLayout from "@/Layouts/MainLayout/MainLayout";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>
    }
])

export default router;