import { useQuery } from "react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const RestaurantAnalytics = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: adminAnalytics = {} } = useQuery({
        queryKey: ["adminAnalytics"],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const data = await axiosSecure(`/orderStates/${user?.email}`)
            return data.data
        }
    });
    //For Sell chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    return (
        <div className="space-y-10">
            <SectionTitle subheading={"10:00am to 10:00pm"} heading={"Your restaurant anaylis dashboard"} />
            <div className="grid grid-cols-3 items-center justify-center">
                <div className="col-span-2">
                    <BarChart
                        width={700}
                        height={500}
                        data={adminAnalytics.orderStates}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {adminAnalytics.orderStates?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                    <p className="text-xl font-semibold">The Chart Base on Which category is populer and the category how many income in doller</p>
                </div>
                <div className='col-span-1'>

                </div>
            </div>
        </div>
    );
};

export default RestaurantAnalytics;