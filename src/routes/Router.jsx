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

export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout />, children: [
            { path: '/', element: <Home /> },
            { path: 'table_reservation', element: <TableReservation /> },
            { path: 'digital_menu', element: <DigitalMenu /> },
            { path: 'cartItem', element: <Cart /> },
            { path: 'order_reservation', element: <UserPrivetRoute><OrderAndReservation /></UserPrivetRoute> },
            { path: 'login', element: <AuthPrivetRoute><Login /></AuthPrivetRoute> },
            { path: 'register', element: <AuthPrivetRoute><Register /></AuthPrivetRoute> },
        ]
    },
    {
        path: "/fleksa_admin", element: <Dashboard />, children: [
            { path: 'restaurant_analytics', element: <RestaurantAnalytics /> },
            { path: "customer_orders", element: <CustomerOrder /> },
            { path: "staff_manages", element: <StaffManages /> },
            { path: "staff_manages/addStaff", element: <AddStaff /> },
            { path: "staff_manages/updateStaffInfo/:id", element: <UpdateStaffInfo /> },
            { path: "add_item", element: <AddItem /> },
            { path: "manage_items/update_item/:id", element: <UpdateItem /> },
            { path: "manage_reservation", element: <ReservedTable /> },
            { path: "allUsersInfo", element: <ManageUsers /> },
            { path: "manage_items", element: <ManageItems /> },
        ]
    }
])