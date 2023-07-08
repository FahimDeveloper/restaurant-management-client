import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Shared/Loading/Loading";


const UserPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading />
    }
    else if (user) {
        return children;
    } else {
        return <Navigate to="/login" replace={true} />
    }
};

export default UserPrivetRoute;