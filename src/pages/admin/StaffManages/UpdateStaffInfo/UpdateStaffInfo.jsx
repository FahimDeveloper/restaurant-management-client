import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const UpdateStaffInfo = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [updatedData, setUpdatedData] = useState({});
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        axiosSecure(`/singleStaffInfo/${user?.email}/${id}`).then(res => {
            setUpdatedData(res.data)
        })
    }, [axiosSecure, user, id])
    const onSubmit = (data) => {
        console.log(data)
        axiosSecure.put(`/updateStaffInfo/${user?.email}/${id}`, data).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Staff Info Update successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/fleksa_admin/staff_manages');
            }
        }).catch(error => console.log(error.message))
    }
    if (Object.keys(updatedData).length === 0) {
        // Render loading state until data is fetched
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="py-16 space-y-10">
                <SectionTitle subheading={"10:00am - 10:00pm"} heading={"update restaurant staff information"} />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 border border-secondary rounded-xl px-24 py-16">
                    <div className="flex gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Name</span>
                            </label>
                            <input defaultValue={updatedData.name} required {...register('name')} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Email</span>
                            </label>
                            <input defaultValue={updatedData.email} required {...register('email')} type="email" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Phone number</span>
                            </label>
                            <input defaultValue={updatedData.phone} required {...register('phone')} type="tel" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Date of birth</span>
                            </label>
                            <input defaultValue={updatedData.dateOfBirth} required {...register('dateOfBirth')} type="date" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Select schedule</span>
                            </label>
                            <select defaultValue={updatedData.schedule} {...register('schedule')} className="select select-bordered w-full">
                                <option>07am to 10am</option>
                                <option>10am to 02pm</option>
                                <option>02pm to 06pm</option>
                                <option>06pm to 10pm</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Select shift</span>
                            </label>
                            <select defaultValue={updatedData.shift} {...register('shift')} className="select select-bordered w-full">
                                <option>Morning</option>
                                <option>Noon</option>
                                <option>Afternoon</option>
                                <option>evening</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-base">Sellery</span>
                            </label>
                            <input defaultValue={updatedData.sellery} required {...register('sellery')} type="number" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-secondary px-10 mt-3"><IoMdPersonAdd /> update staff info</button>
                    </div>
                </form >
            </div >
        </div>
    );
};

export default UpdateStaffInfo;