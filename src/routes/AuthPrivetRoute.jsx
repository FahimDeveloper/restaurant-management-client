import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Shared/Loading/Loading";


const AuthPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading />
    }
    else if (user) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
};

export default AuthPrivetRoute;