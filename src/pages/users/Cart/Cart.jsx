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


const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { isLoading, cartData, refetch } = useCartData();
    useEffect(() => {
        if (!isLoading) {
            setLoading(false)
        }
    }, [isLoading]);
    useEffect(() => {
        const allitems = []
        const cartItem = [...cartData]
        cartItem.map(item => allitems.push(item.price));
        const totalPrice = allitems.reduce((pre, current) => pre + current, 0);
        setTotalPrice(totalPrice)
    }, [cartData]);
    const updatedCartItem = [];
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
    const handlePlaceOrder = () => {
        setLoading(true)
        const menuIdCollection = updatedCartItem.map(item => ({ itemId: item.menuItemId, quantity: item.quantity }));
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
    if (loading || isLoading) {
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
                                {cartData.map(item =>
                                    <CartITem key={item._id}
                                        item={item}
                                        handleRemoveCart={handleRemoveCart}
                                        totalPrice={totalPrice}
                                        setTotalPrice={setTotalPrice}
                                        updatedCartItem={updatedCartItem}
                                    />
                                )}
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