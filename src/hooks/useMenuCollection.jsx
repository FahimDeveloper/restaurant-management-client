import axios from "axios";
import { useQuery } from "react-query";

const useMenuCollection = () => {
    const { data: menuCollection = [], isLoading, refetch } = useQuery({
        queryKey: ['menuCollection'],
        queryFn: async () => {
            const res = await axios.get('https://restaurant-management-server-eight.vercel.app/menuCollection')
            return res.data
        }
    })
    return { menuCollection, isLoading, refetch }
};

export default useMenuCollection;