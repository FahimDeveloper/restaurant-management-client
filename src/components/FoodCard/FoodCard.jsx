
const FoodCard = (props) => {
    const { name, image, price, recipe, available_item } = props;
    return (
        <div className="card bg-base-100 shadow-xl relative card-compact">
            <figure><img src={image} className="w-full object-cover md:h-80 h-96" alt="food image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="text-lg">Price: ${price}</p>
                <p>{recipe.slice(0, 15)}..</p>
                <p className="text-base">Quantity: {available_item}</p>
                <p className="text-lg font-medium">{available_item > 0 ? "Available" : "Not Available"}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => props.handleCartItem(props)} disabled={available_item < 1 ? true : false} className="button-cart">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;