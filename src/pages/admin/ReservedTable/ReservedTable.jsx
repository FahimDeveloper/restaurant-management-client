import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PandingReservation from "./Components/PandingReservation/PandingReservation";
import AllReservation from "./Components/ReservedReservation/Components/AllReservation/AllReservation";
import TodaysReservation from "./Components/ReservedReservation/Components/TodaysReservation/TodaysReservation";

const ReservedTable = () => {
    return (
        <div className="py-16 space-y-10">
            <SectionTitle subheading={"10:00am - 10:00pm"} heading={"All Reservaton information"} />
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Panding Reservation</Tab>
                        <Tab>Accept Reservatoin</Tab>
                    </TabList>
                    <TabPanel>
                        <PandingReservation />
                    </TabPanel>
                    <TabPanel>
                        <Tabs>
                            <TabList>
                                <Tab>All Reservation</Tab>
                                <Tab>Todays Reservation</Tab>
                            </TabList>
                            <TabPanel>
                                <AllReservation />
                            </TabPanel>
                            <TabPanel>
                                <TodaysReservation />
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default ReservedTable;