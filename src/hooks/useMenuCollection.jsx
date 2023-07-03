import axios from "axios";
import { useQuery } from "react-query";

const useMenuCollection = () => {
    const { data: menuCollection = [], isLoading } = useQuery({
        queryKey: 'menuCollection',
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/menuCollection')
            return res.data
        }
    })
    return { menuCollection, isLoading }
};

export default useMenuCollection;