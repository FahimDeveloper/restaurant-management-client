import { BiRestaurant } from "react-icons/bi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";

const UpdateItem = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [updatedItem, setUpdatedItem] = useState({});
    useEffect(() => {
        axiosSecure(`/singleMenuItem/${user?.email}/${id}`).then(data => {
            setUpdatedItem(data.data)
        })
    }, [axiosSecure, id, user])
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseInt(form.price.value)
        const available_item = parseInt(form.available_item.value)
        const recipe = form.recipe.value
        const menuData = { name, category, price, available_item, recipe }
        axiosSecure.put(`/updateMenuItem/${user?.email}/${updatedItem._id}`, menuData).then(data => {
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Menu item updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    return (
        <div className="py-16 space-y-16">
            <SectionTitle subheading="Hurry up" heading="Manage all items" />
            <form onSubmit={handleSubmit} className="space-y-2 border border-secondary rounded-lg p-10">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base">Recipe Name</span>
                    </label>
                    <input type="text" required name="name" defaultValue={updatedItem.name ? updatedItem.name : ''} placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base">Recipe Category</span>
                        </label>
                        <select name="category" defaultValue={updatedItem.category ? updatedItem.category : ''} className="select select-bordered w-full">
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
                        <input type="number" required name='price' defaultValue={updatedItem.price ? updatedItem.price : ''} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base">Available Item</span>
                        </label>
                        <input type="number" required name="available_item" defaultValue={updatedItem.available_item ? updatedItem.available_item : ''} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base">Recipe Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" required name="recipe" defaultValue={updatedItem.recipe ? updatedItem.recipe : ''} placeholder="Description"></textarea>
                </div>
                <div>
                    <button className="btn btn-secondary px-16 mt-5"><BiRestaurant className="text-2xl" /> updte item</button>
                </div>
            </form >
        </div>
    );
};

export default UpdateItem;