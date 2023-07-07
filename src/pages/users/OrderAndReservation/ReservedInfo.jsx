

const ReservedInfo = ({ booking }) => {
    return (
        <div className="card lg:card-side card-compact p-2 border bg-base-100 shadow-xl">
            <figure><img src={booking.table_image} className="w-72 h-48 object-cover" alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">{booking.table_name}</h2>
                <div>
                    Time slot <p className="text-base">{booking.time}</p>
                </div>
                <p className="text-base">Date: {booking.reservationDate}</p>
            </div>
        </div>
    );
};

export default ReservedInfo;