import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const OrderAndReservation = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: orderdInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["orderedInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/orderedInfo/${user?.email}`)
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
                        refetch()
                    }
                }).catch(error => console.log(error.message));
            }
        })
    }
    return (
        <Container>
            <div className="pb-10 pt-24 space-y-16">
                <SectionTitle subheading="10:00am 10:00pm" heading="Your Ordered Information" />
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
                                orderdInfo.map((order, index) => {
                                    return (
                                        <tr key={order._id}>
                                            <th>{index + 1}</th>
                                            <td>{order.userName}</td>
                                            <td>{order.userEmail}</td>
                                            <td>{order.menuItems.length}</td>
                                            <td>$45</td>
                                            <td>{order.status}</td>
                                            <td><button className="btn-sm rounded-lg btn-secondary">View Details</button></td>
                                            <td><button onClick={() => handleCancelOrder(order._id)} className="btn-sm rounded-lg btn-error">Cancel order</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
};

export default OrderAndReservation;