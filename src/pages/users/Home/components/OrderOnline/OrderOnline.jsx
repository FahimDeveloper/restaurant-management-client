import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../../../assets/home/slide1.jpg";
import slide2 from "../../../../../assets/home/slide2.jpg";
import slide3 from "../../../../../assets/home/slide3.jpg";
import slide4 from "../../../../../assets/home/slide4.jpg";
import slide5 from "../../../../../assets/home/slider5.jpg";
import SectionTitle from "../../../../../components/Shared/SectionTitle/SectionTitle";

const OrderOnline = () => {
    return (
        <div className='py-10 space-y-10'>
            <SectionTitle
                subheading={'---From 11:00am to 10:00pm---'}
                heading={"order online"}
            />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='relative'>
                    <img src={slide2} className='sliderImage' alt="slider image" />
                    <p className='sliderText'>pizza</p>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={slide3} className='sliderImage' alt="slider image" />
                    <p className='sliderText'>soups</p>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={slide1} className='sliderImage' alt="slider image" />
                    <p className='sliderText'>salads</p>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={slide4} className='sliderImage' alt="slider image" />
                    <p className='sliderText'>desserts</p>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={slide5} className='sliderImage' alt="slider image" />
                    <p className='sliderText'>Drinks</p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default OrderOnline;