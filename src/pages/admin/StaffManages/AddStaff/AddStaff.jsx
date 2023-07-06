import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";
import { IoMdPersonAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddStaff = () => {
    const { register, handleSubmit } = useForm();
    const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.staff_image[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(imgResponse => {
            if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;
                data.staff_image = imgURL;
                axiosSecure.post(`/addRestaurantStaff/${user?.email}`, data).then(data => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Staff add successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/fleksa_admin/staff_manages');
                    }
                }).catch(error => console.log(error.message))
            }
        })
    }
    return (
        <div className="py-16 space-y-10">
            <SectionTitle subheading={"10:00am - 10:00pm"} heading={"Add restaurant staff"} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 border border-secondary rounded-xl px-24 py-16">
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-base">Name</span>
                        </label>
                        <input required {...register('name')} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-base">Email</span>
                        </label>
                        <input required {...register('email')} type="email" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-base">Phone number</span>
                        </label>
                        <input required {...register('phone')} type="tel" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-base">Date of birth</span>
                        </label>
                        <input required {...register('dateOfBirth')} type="date" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-base">Select schedule</span>
                        </label>
                        <select required {...register('schedule')} className="select select-bordered w-full">
                            <option disabled selected>Select staff Schedule</option>
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
                        <select required {...register('shift')} className="select select-bordered w-full">
                            <option disabled selected>Select staff shift</option>
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
                        <input required {...register('sellery')} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-base">Upload staff photo</span>
                    </label>
                    <input type="file" required {...register('staff_image')} className="file-input file-input-bordered file-input-secondary w-full" />
                </div>
                <div>
                    <button className="btn btn-secondary px-10 mt-3"><IoMdPersonAdd /> add your staff</button>
                </div>
            </form >
        </div >
    );
};

export default AddStaff;