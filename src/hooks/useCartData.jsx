import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCartData = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: cartData = [], isLoading, refetch } = useQuery({
        queryKey: ["userEmail", user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/cartData/${user?.email}`);
            return res.data
        }
    });
    return { cartData, isLoading, refetch }
};

export default useCartData;