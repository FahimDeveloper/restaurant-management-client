import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { useState } from "react";
import { toast } from "react-hot-toast";

const CartITem = ({ item, handleRemoveCart, totalPrice, setTotalPrice, updatedCartItem }) => {
    const [count, setCount] = useState(1)
    const findItem = updatedCartItem.find(dish => dish._id === item._id);
    if (!findItem) {
        updatedCartItem.push(item)
    }
    const handleCount = (action) => {
        if (findItem) {
            if (action === "increment") {
                if (count < 5) {
                    setTotalPrice(totalPrice + item?.price);
                    setCount(count + 1);
                    findItem.quantity = count + 1;
                    toast.success('Item quantity increse');
                } else {
                    toast.error('Quantity maximum 5');
                }
            } else {
                if (count > 1) {
                    setTotalPrice(totalPrice - item?.price)
                    setCount(count - 1)
                    findItem.quantity = count - 1
                    toast.success('Item quantity decrese')
                }
            }
        } else {
            updatedCartItem.push(item)
        }
    }
    return (
        <div className="card card-compact lg:card-side bg-base-100 shadow-xl border">
            <figure className="w-2/5"><img src={item.image} className="w-full h-48 object-cover" alt="Album" /></figure>
            <div className="card-body w-3/5">
                <button onClick={() => handleRemoveCart(item._id)} className="btn-cross">✕</button>
                <h2 className="card-title">{item.name}</h2>
                <p>{item.recipe}</p>
                <p className="text-base">Category: {item.category}</p>
                <div className="flex justify-between items-center">
                    <p className="text-base">${item.price}</p>
                    <div className="flex items-center">
                        <button onClick={() => handleCount("decrement")} className="btn-quantity"><BiMinus /></button>
                        <span className="border px-3 py-1 rounded-lg">{count}</span>
                        <button onClick={() => handleCount("increment")} className="btn-quantity"><BsPlus /></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CartITem;