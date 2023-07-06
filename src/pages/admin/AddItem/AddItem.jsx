import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { BiRestaurant } from "react-icons/bi";
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddItem = () => {
    const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(imgResponse => {
            if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;
                data.image = imgURL;
                data.price = parseInt(data.price)
                data.available_item = parseInt(data.available_item)
                axiosSecure.post(`/addMenuItem/${user?.email}`, data).then(data => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Menu item add successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        reset();
                    }
                })
            }
        })
    }

    return (
        <div className="py-16 space-y-10">
            <SectionTitle subheading="Whats new" heading="add new menu item" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 border border-secondary rounded-lg py-16 px-28">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base">Recipe Name</span>
                    </label>
                    <input type="text" required {...register('name')} placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base">Recipe Category</span>
                        </label>
                        <select required {...register('category')} className="select select-bordered w-full">
                            <option disabled selected value="">Select Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drink">Drink</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base">Price</span>
                        </label>
                        <input type="number" required {...register('price')} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base">Available Item</span>
                        </label>
                        <input type="number" required {...register('available_item')} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base">Recipe Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" required {...register('recipe')} placeholder="Description"></textarea>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base">Choose Recipe image file</span>
                    </label>
                    <input type="file" {...register('image')} required className="file-input file-input-bordered file-input-secondary w-full" />
                </div>
                <div>
                    <button className="btn btn-secondary px-16 mt-5"><BiRestaurant className="text-2xl" /> add item</button>
                </div>
            </form >
        </div >
    );
};

export default AddItem;