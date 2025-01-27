import NavBar from "@/Shared/NavBar";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";

import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
      <div>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
        <Footer/>
      </div>
    );
};

export default MainLayout;