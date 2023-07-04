import axios from "axios";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import foodCover from "../../../assets/shop/banner2.jpg";
// import SectionCover from "../../../components/SectionCover/SectionCover";


const TableReservation = () => {
    const [table, setTable] = useState([])
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const findTable = {
            date: data.date,
            time: data.time
        }
        axios.post("http://localhost:5000/tableInfo", findTable).then(res => {
            setTable(res.data)
        })
    };
    return (
        <>
            {/* <SectionCover img={foodCover} heading={"Table Reservation"} subheading={'would you like to try a dish?'} /> */}
            <Container>
                <div className="py-10">
                    <SectionTitle subheading="Reservatio" heading="book a table" />
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="flex gap-5 items-center">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Date</span>
                                </label>
                                <input type="date" {...register('date')} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Time</span>
                                </label>
                                <select {...register('time')} className="select select-bordered w-full">
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
                                <input type="text" {...register('name')} placeholder="Your name" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Phone</span>
                                </label>
                                <input type="tel" {...register('phone')} placeholder="Phone number" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base">Email</span>
                                </label>
                                <input type="email" {...register('email')} placeholder="Email" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary rounded-full px-16 mt-2">Search Table</button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default TableReservation;