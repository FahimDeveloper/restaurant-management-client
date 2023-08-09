

const SingleMenu = ({ singleMenu }) => {
    const { name, image, price, recipe } = singleMenu
    return (
        <div className='flex space-x-4 items-center'>
            <img style={{ borderRadius: '0 200px 200px 200px' }} src={image} className='w-24 h-24 object-cover' alt="menu item image" />
            <div>
                <h3 className='uppercase'>{name} ------------</h3>
                <p>{recipe.slice(0, 150)}...</p>
            </div>
            <p className='text-lg text-secondary'>${price}</p>
        </div>
    );
};

export default SingleMenu;