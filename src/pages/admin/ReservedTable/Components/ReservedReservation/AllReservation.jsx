import moment from "moment";
import useReservationData from "../../../../../hooks/useReservationData";
import Swal from "sweetalert2";


const AllReservation = () => {
    const { reservationData } = useReservationData();
    const allReservaion = reservationData.filter(data => data.status === "accept");
    const handleView = () => {
        Swal.fire({
            icon: 'info',
            title: 'Working Process',
            text: 'Still we are working for this features',
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
                            allReservaion.map((data, index) => {
                                return (
                                    <tr key={data._id}>
                                        <th>{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.time}</td>
                                        <td>{moment(data.bookingDate).format("ddd, MMM Do YY, h:mm")}</td>
                                        <td>{moment(data.reservationDate).format("ddd, MMM Do YY, h:mm")}</td>
                                        <td>{data.guest}</td>
                                        <td className="space-x-3">
                                            <button onClick={handleView} className="btn btn-sm btn-secondary">view</button>
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

export default AllReservation;