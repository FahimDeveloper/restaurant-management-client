import { useQuery } from "react-query";
// import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";

const useBlogData = () => {
    // const [axiosSecure] = useAxiosSecure();
    const { data: blogData = [], isLoading } = useQuery({
        queryKey: ["blogData"],
        queryFn: async () => {
            const res = await axios.get("/blogs.json");
            return res.data
        }
    });
    return { blogData, isLoading, }
};

export default useBlogData;