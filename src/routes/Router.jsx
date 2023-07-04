import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/users/Home/Home";
import TableReservation from "../pages/users/TableReservation/TableReservation";
import DigitalMenu from "../pages/users/DigitalMenu/DigitalMenu";
import Order from "../pages/users/Order/Order";
import RestaurantAnalytics from "../pages/admin/RestaurantAnalytics/RestaurantAnalytics";
import Dashboard from "../pages/admin/layout/Dashboard";
import CustomerOrder from "../pages/admin/CustomerOrder/CustomerOrder";
import StaffManages from "../pages/admin/StaffManages/StaffManages";
import ReservedTable from "../pages/admin/ReservedTable/ReservedTable";
import AddItem from "../pages/admin/AddItem/AddItem";
import MainLayout from "../pages/users/layout/MainLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout />, children: [
            { path: '/', element: <Home /> },
            { path: 'table_reservation', element: <TableReservation /> },
            { path: 'digital_menu', element: <DigitalMenu /> },
            { path: 'order', element: <Order /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
        path: "/fleksa_admin", element: <Dashboard />, children: [
            { path: 'restaurant_analytics', element: <RestaurantAnalytics /> },
            { path: "customer_order", element: <CustomerOrder /> },
            { path: "staff_manages", element: <StaffManages /> },
            { path: "add_item", element: <AddItem /> },
            { path: "reserved_table", element: <ReservedTable /> },
        ]
    }
])