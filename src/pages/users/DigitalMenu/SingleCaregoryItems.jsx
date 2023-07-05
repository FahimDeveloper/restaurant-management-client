import FoodCard from "../../../components/FoodCard/FoodCard";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartData from "../../../hooks/useCartData";
import toast from 'react-hot-toast';


const SingleCategoryItems = ({ items }) => {
    const { user } = useAuth();
    const { refetch } = useCartData();
    const [axiosSecure] = useAxiosSecure();
    const handleCartItem = (item) => {
        const cartItem = {
            menuItemId: item._id,
            name: item.name,
            recipe: item.recipe,
            price: item.price,
            image: item.image,
            quantity: 1,
            email: user?.email
        }
        axiosSecure.post(`/postCartItem/${user?.email}`, cartItem).then(res => {
            if (res.data.insertedId) {
                toast.success('Item add successfully')
                refetch();
            } else {
                toast.error(res.data)
            }
        }).catch(error => console.log(error.message))
    }
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5">
            {
                items.map(item => <FoodCard key={item._id} {...item} handleCartItem={handleCartItem} />)
            }
        </div>
    );
};

export default SingleCategoryItems;