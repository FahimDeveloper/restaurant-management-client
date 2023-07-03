import { Link } from "react-router-dom";
import SectionTitle from "../../../../../components/Shared/SectionTitle/SectionTitle";
import useMenuCollection from "../../../../../hooks/useMenuCollection";
import SingleMenu from "./SingleMenu";


const OurMenu = () => {
    const { menuCollection } = useMenuCollection();
    return (
        <div className="py-10 space-y-10">
            <SectionTitle
                subheading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            />
            <div className="grid grid-cols-2 gap-5">
                {
                    menuCollection.slice(0, 6).map(menuItem => <SingleMenu key={menuItem._id} singleMenu={menuItem} />)
                }
            </div>
            <div className="text-center">
                <Link to="/digital_menu"><button className='button-menu'>view full menu</button></Link>
            </div>
        </div>
    );
};

export default OurMenu;