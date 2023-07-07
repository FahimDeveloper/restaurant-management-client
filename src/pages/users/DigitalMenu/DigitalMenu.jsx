import SectionCover from "../../../components/SectionCover/SectionCover";
import foodCover from "../../../assets/shop/banner2.jpg";
import useMenuCollection from "../../../hooks/useMenuCollection";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SingleCategoryItems from "./SingleCaregoryItems";
import Container from "../../../components/Shared/Container";
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import Loading from "../../../components/Shared/Loading/Loading";

const DigitalMenu = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
    const { menuCollection } = useMenuCollection();
    const dessert = menuCollection.filter(item => item.category === "dessert");
    const soup = menuCollection.filter(item => item.category === "soup");
    const salad = menuCollection.filter(item => item.category === "salad");
    const pizza = menuCollection.filter(item => item.category === "pizza");
    const drinks = menuCollection.filter(item => item.category === "drinks");
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <SectionCover img={foodCover} heading={"our menu collection"} subheading={'would you like to try a dish?'} />
            <Container>
                <div className='py-10'>
                    <Tabs className="space-y-5">
                        <TabList className='react-tabs__tab-list text-center text-lg tracking-wider font-medium'>
                            <Tab>Salad</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Soup</Tab>
                            <Tab>Dessert</Tab>
                            <Tab>Drinks</Tab>
                        </TabList>
                        <TabPanel>
                            <SingleCategoryItems items={salad} />
                        </TabPanel>
                        <TabPanel>
                            <SingleCategoryItems items={pizza} />
                        </TabPanel>
                        <TabPanel>
                            <SingleCategoryItems items={soup} />
                        </TabPanel>
                        <TabPanel>
                            <SingleCategoryItems items={dessert} />
                        </TabPanel>
                        <TabPanel>
                            <SingleCategoryItems items={drinks} />
                        </TabPanel>
                    </Tabs>
                </div>
            </Container>
        </>
    );
};

export default DigitalMenu;