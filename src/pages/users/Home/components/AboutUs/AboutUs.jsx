import SectionTitle from "../../../../../components/Shared/SectionTitle/SectionTitle";
import { BsCheckLg } from 'react-icons/bs';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useState } from "react";
import aboutUsImage from "../../../../../assets/home/about.jpeg"


const AboutUs = () => {
    const [countOn, setCountOn] = useState(false);
    return (
        <div className="py-10 space-y-10">
            <SectionTitle
                subheading={'--Best restaurant in your city---'}
                heading={'About us'}
            />
            <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
                <div className="grid grid-cols-2 gap-5 items-center">
                    <div className="space-y-5">
                        <h3 className="italic font-semibold text-6xl capitalize">restika one of the best food service</h3>
                        <p className="tracking-wider opacity-80">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore harum incidunt voluptates ipsa. Culpa ad minima dignissimos nam asperiores quia!
                        </p>
                        <div className="grid grid-cols-2 justify-between">
                            <p className="aboutUsCheck"><BsCheckLg className="text-secondary text-3xl" /> Fresh product</p>
                            <p className="aboutUsCheck"><BsCheckLg className="text-secondary text-3xl" /> Vegan cuisine</p>
                            <p className="aboutUsCheck"><BsCheckLg className="text-secondary text-3xl" /> Skilled chef</p>
                            <p className="aboutUsCheck"><BsCheckLg className="text-secondary text-3xl" /> Fresh product</p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-5">
                            <div className="col-span-1 border-r">
                                {
                                    countOn &&
                                    <div>
                                        <p className="text-secondary text-7xl font-bold">
                                            <CountUp start={0} end={35} duration={5} />+
                                        </p>
                                        <p className="text-lg">years in service</p>
                                    </div>
                                }
                            </div>
                            <div className="col-span-2 tracking-wide opacity-80">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur, similique quo incidunt ex distinctio!
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={aboutUsImage} className="w-full h-full rounded-2xl" alt="image" />
                    </div>
                </div>
            </ScrollTrigger>
        </div>
    );
};

export default AboutUs;