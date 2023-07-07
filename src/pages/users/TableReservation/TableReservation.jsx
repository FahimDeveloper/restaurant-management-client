import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import Loading from "../../../components/Shared/Loading/Loading";


const TableReservation = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [tableLoding, setTableLoding] = useState(false);
    const [table, setTable] = useState([])
    const [reservationInfo, setReservationInfo] = useState({})
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setTableLoding(true)
        const findTable = {
            date: data.date,
            time: data.time
        }
        setReservationInfo(data);
        axiosSecure.post("/tableInfo", findTable).then(res => {
            setTable(res.data)
            setTableLoding(false)
        })
    };
    const handleBookingTable = (id, tableName, tableImage) => {
        reservationInfo.table_image = tableImage;
        reservationInfo.table_name = tableName;
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to reserve ${tableName} for Date ${reservationInfo.date} on ${reservationInfo.time}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reserve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post(`/reservedTable/${user?.email}/${id}`, reservationInfo).then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Table reserved successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/order_reservation')
                    }
                }).catch(error => console.log(error.message))
            }
        })
    }
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Container>
                <div className="pb-10 pt-28">
                    <SectionTitle subheading="Reservatio" heading="book a table" />
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="flex gap-5 items-center">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Date</span>
                                </label>
                                <input type="date" {...register('date')} required className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Time</span>
                                </label>
                                <select {...register('time')} required className="select select-bordered w-full">
                                    <option disabled selected value="">Select your time slot</option>
                                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                                    <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
                                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                    <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                                    <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                                    <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
                                    <option value="09:00 PM - 10:00 PM">09:00 PM - 10:00 PM</option>
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Guest</span>
                                </label>
                                <select {...register("person")} className="select select-bordered w-full">
                                    <option value="1 person">1 person</option>
                                    <option value="2 person">2 person</option>
                                    <option value="3 person">3 person</option>
                                    <option value="4 person">4 person</option>
                                    <option value="5 person">5 person</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Name</span>
                                </label>
                                <input type="text" {...register('name')} required placeholder="Your name" defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Phone</span>
                                </label>
                                <input type="tel" {...register('phone')} required placeholder="Phone number" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Email</span>
                                </label>
                                <input type="email" {...register('email')} required placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary rounded-full px-16 mt-2">Search Table</button>
                        </div>
                    </form>
                    {
                        tableLoding ?
                            <div className="h-[500px] flex justify-center items-center"><ImSpinner3 className="text-4xl animate-spin text-secondary" /></div>
                            : <div className="grid grid-cols-3 gap-5 pt-10">
                                {table.map(table => {
                                    return (
                                        <div key={table._id} className="card lg:card-side card-compact bg-base-100 border p-2 shadow-xl">
                                            <figure><img src={table.table_image} className="w-72 h-48 object-cover" alt="Album" /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{table.table_name}</h2>
                                                <p>Time slot {reservationInfo.time}</p>
                                                <div className="card-actions justify-end">
                                                    <button onClick={() => handleBookingTable(table._id, table.table_name, table.table_image)} className="reservationBtn">Book Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            </Container>
        </>
    );
};

export default TableReservation;