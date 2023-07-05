import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartData from "../../../hooks/useCartData";
import CartITem from "./CartITem";


const Cart = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const { cartData, refetch } = useCartData();
    const handleRemoveCart = (id) => {
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
                axiosSecure.delete(`/removeCartItem/${user?.email}/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        refetch();
                    }
                }).catch(error => console.log(error.message))
            }
        })
    }
    const handlePlaceOrder = () => {
        const menuIdCollection = []
        cartData.map(item => menuIdCollection.push(item.menuItemId));
        console.log(menuIdCollection);
    }
    return (
        <Container>
            <div className="pb-10 py-28 space-y-16">
                <SectionTitle subheading="From 10:00am to 10:00pm" heading='Your cart items' />
                {
                    cartData.length > 0 ?
                        <div className="space-y-3">
                            <button onClick={handlePlaceOrder} className="btn btn-secondary px-10 rounded-full">Placed Order</button>
                            <div className="grid grid-cols-3 gap-5">
                                {cartData.map(item => <CartITem key={item._id} item={item} handleRemoveCart={handleRemoveCart} />)}
                            </div>
                        </div> :
                        <div className="flex h-[650px] justify-center items-center">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <h3 className="text-3xl font-semibold">Your cart is empty, Please add some food</h3>
                        </div>
                }
            </div>
        </Container>
    );
};

export default Cart;