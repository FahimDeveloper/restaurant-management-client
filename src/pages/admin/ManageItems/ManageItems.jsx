import Swal from "sweetalert2";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenuCollection from "../../../hooks/useMenuCollection";
import SingleMenuItem from "./SingleMenuItem";


const ManageItems = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { menuCollection, refetch } = useMenuCollection();
    const handleDeleteMenuItem = (id) => {
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
                axiosSecure.delete(`/deleteMenuItem/${user?.email}/${id}`).then(data => {
                    if (data.data.deletedCount > 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Menu item deleted successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                }).catch(error => console.log(error.message))
            }
        })
    }
    return (
        <div className="py-16 space-y-10">
            <SectionTitle subheading="Hurry up" heading="Manage all items" />
            <div className="form-control">
                <div className="input-group justify-center">
                    <input type="text" placeholder="Search by recipe name or category" className="input input-bordered w-96" />
                    <button className="btn btn-square btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-center text-sm">
                        <tr>
                            <th>#</th>
                            <th>Recipe</th>
                            <th>Recipe Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Pulish & Update Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            menuCollection.map((item, index) => <SingleMenuItem key={item._id} item={item} index={index} handleDeleteMenuItem={handleDeleteMenuItem} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;