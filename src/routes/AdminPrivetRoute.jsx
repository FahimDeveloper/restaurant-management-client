import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Shared/Loading/Loading";
import { Navigate } from "react-router-dom";

const AdminPrivetRoute = ({ children }) => {
    const { user, logOut, loading } = useAuth();
    const { userRole, isLoading } = useUser();
    if (loading || isLoading) {
        return <Loading />
    } else if (userRole === "admin") {
        return children
    } else {
        logOut();
        if (!user) {
            return <Navigate to="/login" replace={true} />
        }
    }
};

export default AdminPrivetRoute;