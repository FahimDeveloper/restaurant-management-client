import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import { Toaster } from 'react-hot-toast';


const MainLayout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollRestoration />
            <Toaster />
        </>
    );
};

export default MainLayout;