import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUser = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure();
    const { data: userRole = null, isLoading } = useQuery({
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/userRole/${user?.email}`)
            return res.data.role
        }
    });
    return { userRole, isLoading }
};

export default useUser;