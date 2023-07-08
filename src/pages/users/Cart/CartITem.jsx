import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

const CartITem = ({ item, handleRemoveCart, handleQuantityPlus, handleQuantityMinus }) => {
    return (
        <div className="card card-compact lg:card-side bg-base-100 shadow-xl border">
            <figure className="w-2/5"><img src={item.image} className="w-full h-48 object-cover" alt="Album" /></figure>
            <div className="card-body w-3/5">
                <button onClick={() => handleRemoveCart(item._id)} className="btn-cross">✕</button>
                <h2 className="card-title">{item.name}</h2>
                <p>{item.recipe}</p>
                <p className="text-base">Category: {item.category}</p>
                <div className="flex justify-between items-center">
                    <p className="text-base">${item.price * item.quantity}</p>
                    <div className="flex items-center">
                        <button onClick={() => handleQuantityMinus(item._id, item.quantity)} className="btn-quantity"><BiMinus /></button>
                        <span className="border px-3 py-1 rounded-lg">{item.quantity}</span>
                        <button onClick={() => handleQuantityPlus(item._id, item.quantity)} className="btn-quantity"><BsPlus /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartITem;