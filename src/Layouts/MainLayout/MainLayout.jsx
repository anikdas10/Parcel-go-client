import NavBar from "@/Shared/NavBar";
import Container from "@/components/Container/Container";

import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
      <div>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </div>
    );
};

export default MainLayout;