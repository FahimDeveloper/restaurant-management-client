import { useQuery } from "react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PiUsersFour } from "react-icons/pi";
import { FaUsersGear } from "react-icons/fa6";
import { useEffect, useState } from "react";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const RestaurantAnalytics = () => {
    const { user, loading } = useAuth();
    const [bestDish, setBestDish] = useState({})
    const [count, setCount] = useState({})
    const [chartWidth, setChartWidth] = useState(700)
    const [axiosSecure] = useAxiosSecure();
    const { data: adminAnalytics = {}, isLoading } = useQuery({
        queryKey: ["adminAnalytics"],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const data = await axiosSecure(`/orderStates/${user?.email}`)
            return data.data
        }
    });
    useEffect(() => {
        if (!isLoading) {
            setBestDish(adminAnalytics.bestDish[0]);
        }
        if (screen.width < 1540) {
            setChartWidth(600)
        }
        axiosSecure(`/countOfUsersAndStaffs/${user?.email}`).then(res => {
            setCount(res.data)
        })
    }, [isLoading, adminAnalytics, axiosSecure, user])
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
    const allIncome = []
    adminAnalytics?.orderStates?.map(category => allIncome.push(category.total));
    const totalIncome = allIncome.reduce((sum, currentValue) => sum + currentValue, 0);
    return (
        <div className="py-16 space-y-10">
            <SectionTitle subheading={"10:00am to 10:00pm"} heading={"Your restaurant analysis dashboard"} />
            <div className="space-y-5">
                <div className="stats shadow justify-center w-full">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Income</div>
                        <div className="stat-value">${totalIncome}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <PiUsersFour className="text-3xl text-secondary" />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{count.countUsers}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsersGear className="text-3xl text-secondary" />
                        </div>
                        <div className="stat-title">Total Staff</div>
                        <div className="stat-value">{count.countStaffs}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                </div>
                <div className="grid 2xl:grid-cols-3 grid-cols-6 items-center justify-center">
                    <div className="2xl:col-span-2 col-span-4">
                        <BarChart
                            width={chartWidth}
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
                        <p className="text-lg font-semibold">The Chart Based on Which category is populer and the category how many income in doller</p>
                    </div>
                    <div className='2xl:col-span-1 col-span-2'>
                        {
                            <div className="card 2xl:w-96 card-compact w-80 bg-base-100 shadow-xl relative">
                                <figure><img src={bestDish?.full_dish?.image} className="h-80 w-full object-cover" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <div className="badge badge-secondary absolute top-2 right-2">Populer Dish</div>
                                    <h2 className="card-title">{bestDish?.full_dish?.name}</h2>
                                    <p>Category: {bestDish?.category}</p>
                                    <p>Total sell: {bestDish?.count}</p>
                                    <p>Total income: ${bestDish?.total}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantAnalytics;