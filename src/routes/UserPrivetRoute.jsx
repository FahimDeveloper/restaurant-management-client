import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const UserPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>loading</p>
    }
    if (user) {
        return children;
    } else {
        return <Navigate to="/login" replace={true} />
    }
};

export default UserPrivetRoute;