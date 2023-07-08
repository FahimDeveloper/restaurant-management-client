import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/users/Home/Home";
import TableReservation from "../pages/users/TableReservation/TableReservation";
import DigitalMenu from "../pages/users/DigitalMenu/DigitalMenu";
import RestaurantAnalytics from "../pages/admin/RestaurantAnalytics/RestaurantAnalytics";
import Dashboard from "../pages/admin/layout/Dashboard";
import CustomerOrder from "../pages/admin/CustomerOrder/CustomerOrder";
import StaffManages from "../pages/admin/StaffManages/StaffManages";
import ReservedTable from "../pages/admin/ReservedTable/ReservedTable";
import AddItem from "../pages/admin/AddItem/AddItem";
import MainLayout from "../pages/users/layout/MainLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import UserPrivetRoute from "./userPrivetRoute";
import AuthPrivetRoute from "./AuthPrivetRoute";
import OrderAndReservation from "../pages/users/OrderAndReservation/OrderAndReservation";
import Cart from "../pages/users/Cart/Cart";
import ManageUsers from "../pages/admin/ManageUsers/ManageUsers";
import ManageItems from "../pages/admin/ManageItems/ManageItems";
import UpdateItem from "../pages/admin/ManageItems/UpdateItem/UpdateItem";
import AddStaff from "../pages/admin/StaffManages/AddStaff/AddStaff";
import UpdateStaffInfo from "../pages/admin/StaffManages/UpdateStaffInfo/UpdateStaffInfo";
import AdminPrivetRoute from "./AdminPrivetRoute";

export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout />, children: [
            { path: '/', element: <Home /> },
            { path: 'digital_menu', element: <DigitalMenu /> },
            { path: 'table_reservation', element: <UserPrivetRoute><TableReservation /></UserPrivetRoute> },
            { path: 'cartItem', element: <Cart /> },
            { path: 'order_reservation', element: <UserPrivetRoute><OrderAndReservation /></UserPrivetRoute> },
            { path: 'login', element: <AuthPrivetRoute><Login /></AuthPrivetRoute> },
            { path: 'register', element: <AuthPrivetRoute><Register /></AuthPrivetRoute> },
        ]
    },
    {
        path: "/fleksa_admin", element: <AdminPrivetRoute><Dashboard /></AdminPrivetRoute>, children: [
            { path: 'restaurant_analytics', element: <AdminPrivetRoute><RestaurantAnalytics /></AdminPrivetRoute> },
            { path: "customer_orders", element: <AdminPrivetRoute><CustomerOrder /></AdminPrivetRoute> },
            { path: "staff_manages", element: <AdminPrivetRoute><StaffManages /></AdminPrivetRoute> },
            { path: "staff_manages/addStaff", element: <AdminPrivetRoute><AddStaff /></AdminPrivetRoute> },
            { path: "staff_manages/updateStaffInfo/:id", element: <AdminPrivetRoute><UpdateStaffInfo /></AdminPrivetRoute> },
            { path: "add_item", element: <AdminPrivetRoute><AddItem /></AdminPrivetRoute> },
            { path: "manage_items/update_item/:id", element: <AdminPrivetRoute><UpdateItem /></AdminPrivetRoute> },
            { path: "manage_reservation", element: <AdminPrivetRoute><ReservedTable /></AdminPrivetRoute> },
            { path: "allUsersInfo", element: <AdminPrivetRoute><ManageUsers /></AdminPrivetRoute> },
            { path: "manage_items", element: <AdminPrivetRoute><ManageItems /></AdminPrivetRoute> },
        ]
    }
])