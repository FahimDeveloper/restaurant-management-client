import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useReservationData = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: reservationData = [], isLoading, refetch } = useQuery({
        queryKey: ["reservationData"],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const data = await axiosSecure(`/tableReservationInfoForAdmin/${user?.email}`)
            return data.data
        }
    });
    return { reservationData, isLoading, refetch }
};

export default useReservationData;