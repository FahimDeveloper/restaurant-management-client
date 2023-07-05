import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCartData = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: cartData = [], isLoading, refetch } = useQuery({
        queryKey: ["userEmail", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/cartData/${user?.email}`);
            return res.data
        }
    });
    return { cartData, isLoading, refetch }
};

export default useCartData;