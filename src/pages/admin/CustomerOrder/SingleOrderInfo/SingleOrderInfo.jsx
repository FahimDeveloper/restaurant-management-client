import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const SingleOrderInfo = ({ orders, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const [viewDetails, setViewDetails] = useState([]);
    const { user } = useAuth();
    const handleDeleteOrder = (id) => {
        console.log(id)
    }
    const handleChangeStutas = (e, id) => {
        const status = e.target.value
        axiosSecure.put(`/changeStatus/${user?.email}/${id}`, { status }).then(data => {
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'status changed successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch();
            }
        }).catch(error => console.log(error));
    }
    const handleViewOrder = (id) => {
        axiosSecure(`/viewOrderInfo/${user?.email}/${id}`).then(data => {
            setViewDetails(data.data);
        });
    }
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Total Item</th>
                            <th>Total Price</th>
                            <th>Order Status</th>
                            <th>View Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => {
                                return (
                                    <tr key={order._id} className="text-center">
                                        <th>{index + 1}</th>
                                        <td>{order.userName}</td>
                                        <td>{order.userEmail}</td>
                                        <td>{order.orderedItems.length}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <select disabled={order.status == "served" ? true : false} defaultValue={order.status} onChange={(e) => handleChangeStutas(e, order._id)} className="select select-bordered max-w-xs">
                                                <option value="receive">receive</option>
                                                <option value="preparing">preparing</option>
                                                <option value="ready to serve">ready to serve</option>
                                                <option value="served">served</option>
                                            </select>
                                        </td>
                                        <td>
                                            <label onClick={() => handleViewOrder(order._id)} htmlFor="my_modal_1" className="btn btn-sm btn-secondary">view order</label>
                                        </td>
                                        <td>
                                            <button disabled={order.status == "ready to serve" || order.status == "served" ? true : false} onClick={() => handleDeleteOrder(order._id)} className="btn btn-sm disabled btn-error">Cancel Order</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <input type="checkbox" id="my_modal_1" className="modal-toggle" />
                <div className="modal">
                    <div className={`modal-box ${viewDetails.length > 1 ? 'max-w-5xl' : ""} space-y-3`}>
                        <label htmlFor="my_modal_1" className="btn btn-sm bg-neutral text-white btn-circle btn-ghost absolute right-2 top-2">✕</label>
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
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleOrderInfo;