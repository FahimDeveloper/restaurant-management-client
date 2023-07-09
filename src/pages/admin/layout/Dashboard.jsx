import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome, AiOutlineBars } from "react-icons/ai";
import { BiRestaurant, BiSolidBookReader } from "react-icons/bi";
// import { FaUsers } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BsFillBookmarkCheckFill, BsFillBookmarksFill, BsBookmarks } from "react-icons/bs";
import { IoRestaurantSharp } from "react-icons/io5";
import ContainerAdmin from "../../../components/Shared/ContainerAdmin";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <ContainerAdmin>
                    <Outlet />
                    <Toaster />
                </ContainerAdmin>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 h-full bg-secondary text-base-100">
                    <h2 className="text-2xl text-center font-semibold mb-5 uppercase">Restaurant Admin</h2>
                    <div className="space-y-2">
                        <NavLink to="restaurant_analytics" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><AiOutlineHome className="text-2xl" /> Admin Home</NavLink>
                        <NavLink to="add_item" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><BiRestaurant className="text-2xl" /> Add Item</NavLink>
                        <NavLink to="manage_items" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><AiOutlineBars className="text-2xl" /> Manage Items</NavLink>
                        <NavLink to="manage_reservation" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><BsBookmarks className="text-2xl" /> Manage Bookings</NavLink>
                        <NavLink to="customer_orders" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><BsFillBookmarkCheckFill className="text-2xl" /> Manage Orders</NavLink>
                        <NavLink to="staff_manages" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><FaUsersGear className="text-2xl" /> All Staff</NavLink>
                        {/* <NavLink to="allUsersInfo" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><FaUsers className="text-2xl" /> All Users</NavLink> */}
                    </div>
                    <div className="divider"></div>
                    <div className="space-y-2">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><AiOutlineHome className="text-2xl" /> Home</NavLink>
                        <NavLink to="/digital_menu" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><IoRestaurantSharp className="text-2xl" /> Menu</NavLink>
                        <NavLink to="/table_reservation" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><BsFillBookmarksFill className="text-2xl" /> Table Reservation</NavLink>
                        <NavLink to="/order_reservation" className={({ isActive }) => isActive ? "active_admin_nav admin_nav" : "admin_nav"}><BiSolidBookReader className="text-2xl" /> Order & Reservation</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;