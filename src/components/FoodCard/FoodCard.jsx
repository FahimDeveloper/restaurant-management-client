
const FoodCard = (props) => {
    const { name, image, price, recipe } = props;
    return (
        <div className="card bg-base-100 shadow-xl relative">
            <figure><img src={image} className="w-full object-cover md:h-80 h-96" alt="food image" /></figure>
            <div className="badge badge-neutral px-3 py-4 rounded-md absolute right-0 top-1 text-base">${price}</div>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="button-cart">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;