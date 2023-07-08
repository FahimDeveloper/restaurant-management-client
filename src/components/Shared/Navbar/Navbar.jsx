import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiUserCircleLight } from "react-icons/pi";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import useCartData from "../../../hooks/useCartData";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { userRole } = useUser();
    const { cartData } = useCartData();
    return (
        <div className="fixed top-0 left-0 w-full z-10 bg-black bg-opacity-60 text-base-100">
            <Container>
                <div className="flex justify-between items-center py-3">
                    <div>
                        <h3 className="text-4xl font-medium italic">Restaurant</h3>
                    </div>
                    <div className="space-x-8 text-lg font-medium">
                        <NavLink className={({ isActive }) => isActive ? "text-primary" : ""} to="/">Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "text-primary" : ""} to="digital_menu">Menu</NavLink>
                        {
                            user ? <>
                                <NavLink className={({ isActive }) => isActive ? "text-primary" : ""} to="table_reservation">Table Reservation</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "text-primary" : ""} to="order_reservation">Order & Reservation</NavLink>
                                {
                                    !!userRole && userRole === "admin" ?
                                        <NavLink to="/fleksa_admin/restaurant_analytics">Dashboard</NavLink>
                                        : ""
                                }
                            </> : <NavLink className={({ isActive }) => isActive ? "text-primary" : ""} to="/login">Login</NavLink>
                        }
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="indicator">
                            <Link to="/cartItem"><HiOutlineShoppingCart className="text-3xl" /></Link>
                            {
                                cartData.length > 0 ?
                                    <span className="badge indicator-item">{cartData.length}</span>
                                    : ''
                            }
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0}>
                                <PiUserCircleLight className="text-4xl cursor-pointer" />
                            </label>
                            <ul tabIndex={0} className="menu text-neutral menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    user ?
                                        <li onClick={logOut}><a>Logout</a></li>
                                        : <>
                                            <li><Link to="/login">Sign In</Link></li>
                                            <li><Link to="/register">Sign Up</Link></li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;