import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
// import slide1 from "../../../../../assets/home/menuSlide1.jpeg"
// import slide2 from "../../../../../assets/home/menuSlide2.jpeg"
// import slide3 from "../../../../../assets/home/menuSlide3.jpeg"
// import slide4 from "../../../../../assets/home/menuSlide4.jpeg"
import SectionTitle from '../../../../../components/Shared/SectionTitle/SectionTitle';
import Container from '../../../../../components/Shared/Container';
import { useState } from 'react';

const BlogSlide = ({ blogData }) => {
    const [dataIndex, setDataIndex] = useState(0);
    const setIndex = (slide) => {
        setDataIndex(slide.activeIndex)
    }
    return (
        <div style={{
            backgroundImage: `linear-gradient(0deg, rgba(21, 21, 21, 0.70) 0%, rgba(21, 21, 21, 0.70) 100%), url(${blogData[dataIndex].image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className='py-10 space-y-10'>
                <SectionTitle
                    subheading={'--Latest blog---'}
                    heading={'From our menu'}
                    color="white"
                />
                <Container>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay]}
                        className="mySwiper"
                        onSlideChange={setIndex}
                    >
                        {
                            blogData.map((blog, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="text-base-100 py-16">
                                            <div className='grid grid-cols-2 gap-5 items-center'>
                                                <div>
                                                    <img src={blog.image} alt="slide image" className='rounded-2xl w-full max-h-[500px] object-cover' />
                                                </div>
                                                <div>
                                                    <h1 className="mb-5 text-5xl font-bold">{blog.title}</h1>
                                                    <p className="mb-5">{blog.text}</p>
                                                    <button className="button-blog">read more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Container>
            </div>
        </div >
    );
};

export default BlogSlide;