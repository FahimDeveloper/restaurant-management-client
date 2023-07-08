import moment from "moment/moment";
import useReservationData from "../../../../../hooks/useReservationData";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const PandingReservation = () => {
    const [axiosSecure] = useAxiosSecure();
    const { reservationData, refetch } = useReservationData();
    const pandingReservation = reservationData.filter(data => data.status === "panding");
    const handleBookingStatus = (email, id, table_id, status) => {
        axiosSecure.put(`/reservationStatus/${email}/${id}/${table_id}`, { status: status }).then(data => {
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Reservation has been ${status}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Schedule</th>
                            <th>Booking Date</th>
                            <th>Reservation Date</th>
                            <th>Guest</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            pandingReservation.map((data, index) => {
                                return (
                                    <tr key={data._id}>
                                        <th>{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.time}</td>
                                        <td>{moment(data.bookingDate).format("ddd, MMM Do YY, h:mm")}</td>
                                        <td>{moment(data.reservationDate).format("ddd, MMM Do YY, h:mm")}</td>
                                        <td>{data.guest}</td>
                                        <td className="space-x-3">
                                            <button onClick={() => handleBookingStatus(data.email, data._id, data.table_id, "accept")} className="btn btn-sm btn-success">accept</button>
                                            <button onClick={() => handleBookingStatus(data.email, data._id, data.table_id, "deny")} className="btn btn-sm btn-error">deny</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PandingReservation;