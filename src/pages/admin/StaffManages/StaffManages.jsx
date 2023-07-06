import { Link } from "react-router-dom";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";


const StaffManages = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [viewMore, setViewMore] = useState({});
    const { data: staffsData = [], refetch } = useQuery({
        queryKey: ['staffsData'],
        queryFn: async () => {
            const data = await axiosSecure(`/staffCollection/${user?.email}`);
            return data.data;
        }
    });
    const handleDeleteStaff = (id) => {
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
                axiosSecure.delete(`/deleteStaff/${user?.email}/${id}`).then(data => {
                    if (data.data.deletedCount > 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Staff has been deleted',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
            }
        })
    }
    return (
        <div className="py-16 space-y-16">
            <SectionTitle subheading={`10:00am - 10:00pm`} heading={'all staff information'} />
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search by name or phone number" className="input input-bordered w-96" />
                            <button className="btn btn-secondary btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                    <Link to="addStaff"><button className="btn btn-secondary px-10">Add new staff</button></Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="bg-secondary text-white text-center text-sm">
                            <tr>
                                <th>#</th>
                                <th>Staff</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Schedule</th>
                                <th>Shift</th>
                                <th>More about staff</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                staffsData.map((staff, index) => {
                                    return (
                                        <tr key={staff._id}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={staff.staff_image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{staff.name}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.schedule}</td>
                                            <td>{staff.shift}</td>
                                            <td><label onClick={() => setViewMore(staff)} htmlFor="my_modal_2" className="btn btn-outline btn-sm text-xs btn-secondary">view</label></td>
                                            <td className="space-x-2">
                                                <Link to={`updateStaffInfo/${staff._id}`}><button className="btn btn-sm text-xs btn-secondary">Update</button></Link>
                                                <button onClick={() => handleDeleteStaff(staff._id)} className="btn btn-sm text-xs btn-error">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {/* view more about staff */}
                    <input type="checkbox" id="my_modal_2" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box space-y-5 w-11/12 max-w-3xl">
                            <label htmlFor="my_modal_2" className="btn btn-sm bg-neutral text-white btn-circle btn-ghost absolute right-2 top-2">✕</label>
                            <div className="card lg:card-side bg-base-100 shadow-xl">
                                <figure className="w-2/5"><img src={viewMore.staff_image} className="w-96 h-80 object-cover" alt="Album" /></figure>
                                <div className="card-body card-compact space-y-5 w-3/5">
                                    <h2 className="card-title">{viewMore.name}</h2>
                                    <div className="space-y-3">
                                        <p>Email: {viewMore.email}</p>
                                        <p><a href={`tel:${viewMore.phone}`}>Phone: {viewMore.phone}</a></p>
                                        <p>Date Of Birth: {viewMore.dateOfBirth}</p>
                                        <p>Schedule: {viewMore.schedule}</p>
                                        <p>Shift: {viewMore.shift}</p>
                                        <p>Sellery: ${viewMore.sellery}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StaffManages;