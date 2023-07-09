/* eslint-disable react/no-unescaped-entities */
import { PiSpinner } from "react-icons/pi";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderInfo from "./OrderInfo";
import ReservedInfo from "./ReservedInfo";
import { useEffect, useState } from "react";
import Loading from "../../../components/Shared/Loading/Loading";

const OrderAndReservation = () => {
    const [loading, setLoading] = useState(true);
    const [viewloading, setViewLoading] = useState(true);
    const [viewDetails, setViewDetails] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: orderdInfo = [], isLoading: orderLoading, refetch: orderedRefetch } = useQuery({
        queryKey: ["orderedInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/orderedInfo/${user?.email}`)
            return res.data
        }
    });
    const { data: tableReservedInfo = [], isLoading: tableLoading } = useQuery({
        queryKey: ["reservedInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/tableReservationInfo/${user?.email}`)
            return res.data
        }
    });
    const handleCancelOrder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cancelOrder/${user?.email}/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your order cancel successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        orderedRefetch()
                    }
                }).catch(error => console.log(error.message));
            }
        })
    }
    const handleViewOrder = (id) => {
        setViewLoading(true)
        axiosSecure(`/viewOrderInfo/${user?.email}/${id}`).then(data => {
            setViewDetails(data.data);
            setViewLoading(false)
        });
    }
    const handleCancelBooking = () => {
        Swal.fire({
            icon: 'info',
            title: 'Working Process',
            text: 'Still we are working for this features',
        })
    }
    if (loading || orderLoading || tableLoading) {
        return <Loading />
    }
    return (
        <Container>
            <div className="pb-10 pt-24 space-y-16">
                <SectionTitle subheading="10:00am 10:00pm" heading="Your Ordered Information" />
                <Tabs className="space-y-10">
                    <TabList>
                        <Tab>Ordered Information</Tab>
                        <Tab>Table Reserved Information</Tab>
                    </TabList>
                    <TabPanel>
                        {
                            orderdInfo.length > 0 ?
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Customer name</th>
                                                <th>Customer Email</th>
                                                <th>Total Item</th>
                                                <th>Total Price</th>
                                                <th>Status</th>
                                                <th>Details</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {
                                                orderdInfo.map((order, index) => <OrderInfo key={order._id} order={order} index={index} handleCancelOrder={handleCancelOrder} handleViewOrder={handleViewOrder} />)
                                            }
                                        </tbody>
                                    </table>
                                    <input type="checkbox" id="my_modal_4" className="modal-toggle" />
                                    <div className="modal">
                                        <div className={`modal-box ${viewDetails.length > 1 ? 'max-w-5xl' : ""} space-y-3`}>
                                            <label htmlFor="my_modal_4" className="btn btn-sm bg-neutral text-white btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                            {
                                                viewloading ? <div className="h-[300px] flex items-center justify-center"><PiSpinner className="animate-spin text-4xl text-secondary" /></div>
                                                    : <>
                                                        <h3 className="font-bold text-lg">Total Item {viewDetails.length}</h3>
                                                        <div className={`grid ${viewDetails.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                                                            {
                                                                viewDetails.map(item => {
                                                                    return (
                                                                        <div key={item._id} className="card card-compact card-side bg-base-100 shadow-xl">
                                                                            <figure className="w-1/2"><img src={item.image} className="w-full h-52 object-cover" alt="Movie" /></figure>
                                                                            <div className="card-body w-1/2">
                                                                                <h2 className="card-title">{item.name}</h2>
                                                                                <p className="text-lg">Category {item.category}</p>
                                                                                <p className="text-lg">quantity : 1</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                : <p className="flex items-center justify-center text-3xl font-semibold full-center">You haven't any ordered food, Please order some food</p>
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            tableReservedInfo.length > 0 ?
                                <div className="grid grid-cols-3 gap-5">
                                    {
                                        tableReservedInfo.map(table => <ReservedInfo key={table._id} booking={table.booking_list} handleCancelBooking={handleCancelBooking} />)
                                    }
                                </div>
                                : <p className="flex items-center justify-center text-3xl font-semibold full-center">You haven't any reservation, Please reserved a table</p>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        </Container>
    );
};

export default OrderAndReservation;