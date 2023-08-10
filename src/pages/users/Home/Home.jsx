import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import BannerSection from "./components/BannerSection/BannerSection";
import FavouriteItems from "./components/FavouriteItems/FavouriteItems";
import OrderOnline from "./components/OrderOnline/OrderOnline";
import OurMenu from "./components/OurMenu/OurMenu";
import Loading from "../../../components/Shared/Loading/Loading";
import AboutUs from "./components/AboutUs/AboutUs";
import BlogSlide from "./components/BlogSlide/BlogSlide";
import useBlogData from "../../../hooks/useBlogData";


const Home = () => {
    const { blogData, isLoading } = useBlogData();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
    if (loading, isLoading) {
        return <Loading />
    }
    return (
        <div>
            <BannerSection />
            <Container>
                <AboutUs />
                <OrderOnline />
                <OurMenu />
                <FavouriteItems />
            </Container>
            <BlogSlide blogData={blogData} />
        </div>
    );
};

export default Home;