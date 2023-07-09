import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartData from "../../../hooks/useCartData";
import CartITem from "./CartITem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../../components/Shared/Loading/Loading";
import { toast } from "react-hot-toast";


const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
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
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Item remove successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                }).catch(error => console.log(error.message))
            }
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
    useEffect(() => {
        const allCartItemPrices = []
        cartData.map(item => allCartItemPrices.push(item.price * item.quantity));
        const calculatePrice = allCartItemPrices.reduce((sum, currentValue) => sum + currentValue, 0)
        setTotalPrice(calculatePrice);
    }, [cartData, count]);
    const handlePlaceOrder = () => {
        setLoading(true)
        const menuIdCollection = cartData.map(item => ({ itemId: item.menuItemId, quantity: item.quantity }));
        const orderData = {
            userName: user?.displayName,
            userEmail: user?.email,
            orderedItems: menuIdCollection,
            orderDate: new Date(),
            status: 'receive',
            totalPrice: totalPrice
        }
        axiosSecure.post(`/placedOrder/${user?.email}`, orderData).then(res => {
            if (res.data.insertedId) {
                axiosSecure.delete(`/removeAllCartItem/${user?.email}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        setLoading(false);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your order placed successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                        navigate('/order_reservation');
                    }
                }).catch(error => console.log(error.message))
            }
        }).catch(error => console.log(error.message))
    }
    const handleQuantityPlus = (id, quantity) => {
        axiosSecure.put(`/quantityPlus/${user?.email}/${id}`, { quantity }).then(res => {
            if (res.data.modifiedCount) {
                refetch();
                toast.success('Item quantity increase')
                setCount(!count)
            } else if (res.data.max) {
                toast.error('Quantity maximum 5')
            } else {
                toast.error(res.data.finish)
            }
        }).catch(error => console.log(error.message))
    }
    const handleQuantityMinus = (id, quantity) => {
        axiosSecure.put(`/quantityMinus/${user?.email}/${id}`, { quantity }).then(res => {
            if (res.data.modifiedCount) {
                toast.success('Item quantity decrease')
                setCount(!count)
                refetch();
            } else {
                toast.error('Quantity minimum 1 need')
            }
        }).catch(error => console.log(error.message))
    }
    if (loading) {
        return <Loading />
    }
    return (
        <Container>
            <div className="pb-10 py-28 space-y-16">
                <SectionTitle subheading="From 10:00am to 10:00pm" heading='Your cart items' />
                {
                    cartData.length > 0 ?
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <div className="text-xl flex gap-5">
                                    <p>Total Item: {cartData.length}</p>
                                    <p>Total Price: {totalPrice}</p>
                                </div>
                                <button onClick={handlePlaceOrder} className="btn btn-secondary px-10 rounded-full">Placed Order</button>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                {cartData.map(item => <CartITem key={item._id} item={item} handleRemoveCart={handleRemoveCart} handleQuantityPlus={handleQuantityPlus} handleQuantityMinus={handleQuantityMinus} />)}
                            </div>
                        </div> :
                        <div className="flex justify-center items-center full-center">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <p className="text-3xl font-semibold">Your cart is empty, Please add some food</p>
                        </div>
                }
            </div>
        </Container>
    );
};

export default Cart;