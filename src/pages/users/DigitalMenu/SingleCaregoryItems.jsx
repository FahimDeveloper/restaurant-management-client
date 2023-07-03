import FoodCard from "../../../components/FoodCard/FoodCard";


const SingleCategoryItems = ({ items }) => {
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5">
            {
                items.map(item => <FoodCard key={item._id} {...item} />)
            }
        </div>
    );
};

export default SingleCategoryItems;