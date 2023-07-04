import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const AuthPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>Loading</p>
    }
    if (user) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
};

export default AuthPrivetRoute;