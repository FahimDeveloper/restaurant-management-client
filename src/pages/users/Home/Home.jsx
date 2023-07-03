import Container from "../../../components/Shared/Container";
import BannerSection from "./components/BannerSection/BannerSection";
import FavouriteItems from "./components/FavouriteItems/FavouriteItems";
import OrderOnline from "./components/OrderOnline/OrderOnline";
import OurMenu from "./components/OurMenu/OurMenu";


const Home = () => {
    return (
        <div>
            <Container>
                <BannerSection />
                <OrderOnline />
                <OurMenu />
                <FavouriteItems />
            </Container>
        </div>
    );
};

export default Home;