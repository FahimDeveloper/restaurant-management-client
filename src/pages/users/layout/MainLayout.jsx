import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../../../components/Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollRestoration />
        </>
    );
};

export default MainLayout;