import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SingleOrderInfo from './SingleOrderInfo/SingleOrderInfo';

const CustomerOrder = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ['allOrdersData'],
        queryFn: async () => {
            const data = await axiosSecure(`/allOrderCollection/${user?.email}`);
            return data.data;
        }
    });
    const receive = allOrders.filter(order => order.status === "receive");
    const preparing = allOrders.filter(order => order.status === "preparing");
    const readyToServe = allOrders.filter(order => order.status === "ready to serve");
    const served = allOrders.filter(order => order.status === "served");
    return (
        <div className='py-16 space-y-10'>
            <SectionTitle subheading={`10:00am - 10:00pm`} heading={`all customer orders`} />
            <Tabs>
                <TabList>
                    <Tab>Receive</Tab>
                    <Tab>Preparing</Tab>
                    <Tab>Ready to serve</Tab>
                    <Tab>Served</Tab>
                </TabList>
                <TabPanel>
                    <SingleOrderInfo orders={receive} refetch={refetch} />
                </TabPanel>
                <TabPanel>
                    <SingleOrderInfo orders={preparing} refetch={refetch} />
                </TabPanel>
                <TabPanel>
                    <SingleOrderInfo orders={readyToServe} refetch={refetch} />
                </TabPanel>
                <TabPanel>
                    <SingleOrderInfo orders={served} refetch={refetch} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default CustomerOrder;