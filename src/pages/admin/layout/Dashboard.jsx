import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome, AiOutlineBars } from "react-icons/ai";
import { BiRestaurant, BiSolidBookAdd } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import Container from "../../../components/Shared/Container";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Container><Outlet /></Container>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 h-full bg-secondary text-base-100 space-y-10">
                    <h2 className="text-3xl text-center font-semibold">Restaurant Admin</h2>
                    <div className="space-y-3">
                        <NavLink to="restaurant_analytics" className="admin_nav"><AiOutlineHome className="text-2xl" /> Admin Home</NavLink>
                        <NavLink to="add_item" className="admin_nav"><BiRestaurant className="text-2xl" /> Add Item</NavLink>
                        <NavLink to="manage_items" className="admin_nav"><AiOutlineBars className="text-2xl" /> Manage Items</NavLink>
                        <NavLink to="manage_reservation" className="admin_nav"><BiSolidBookAdd className="text-2xl" /> Manage Bookings</NavLink>
                        <NavLink to="customer_orders" className="admin_nav"><BsFillBookmarkCheckFill className="text-2xl" /> Manage Orders</NavLink>
                        <NavLink to="staff_manages" className="admin_nav"><FaUsersGear className="text-2xl" /> All Staff</NavLink>
                        <NavLink to="allUsersInfo" className="admin_nav"><FaUsers className="text-2xl" /> All Users</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;