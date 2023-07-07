import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import BannerSection from "./components/BannerSection/BannerSection";
import FavouriteItems from "./components/FavouriteItems/FavouriteItems";
import OrderOnline from "./components/OrderOnline/OrderOnline";
import OurMenu from "./components/OurMenu/OurMenu";
import Loading from "../../../components/Shared/Loading/Loading";


const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])
    if (loading) {
        return <Loading />
    }
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