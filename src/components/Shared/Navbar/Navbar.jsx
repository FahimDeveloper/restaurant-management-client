import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import Container from "../Container";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-10 bg-black bg-opacity-60 text-base-100">
            <Container>
                <div className="flex justify-between items-center py-3">
                    <div>
                        <h3 className="text-4xl font-medium italic">Restaurant</h3>
                    </div>
                    <div className="space-x-8 text-lg font-medium">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="digital_menu">Menu</NavLink>
                        <NavLink to="table_reservation">Table Reservation</NavLink>
                        <NavLink to="order">Order</NavLink>
                        <NavLink to="/fleksa_admin/restaurant_analytics">Dashboard</NavLink>
                    </div>
                    <div className="flex gap-5">
                        <HiOutlineShoppingCart className="text-2xl" />
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0}>
                                <BiUserCircle className="text-2xl" />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;