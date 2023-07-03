import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default MainLayout;