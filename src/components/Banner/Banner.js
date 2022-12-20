import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// import images
import bg from "../../assets/images/hero-slider/one/bg-1.png"
import img1 from "../../assets/images/hero-slider/one/1.png"
import img2 from "../../assets/images/hero-slider/one/2.png"


import PrimaryButton from "../Shared/Buttons/PrimaryButton";

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper min-h-screen"
            >
                <SwiperSlide style={{ backgroundImage: `url(${bg})` }}>
                    <div className="flex items-center lg:flex-row flex-col justify-between text-left">
                        <div className="flex-1 lg:pl-16 animate__animated animate__fadeInUp animate__slower">
                            <h2 className="lg:text-6xl text-2xl font-bold my-6">Organic Foods & Vegetables</h2>
                            <p className="my-6">25 Years of experience in agriculture farming</p>
                            <PrimaryButton text={"Shop Now"}></PrimaryButton>
                        </div>
                        <div className="animate__animated animate__fadeInUp animate__slower"  >
                            <img src={img1} alt="vegitable" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundImage: `url(${bg})` }}>
                    <div className="flex lg:flex-row  flex-col-reverse items-center justify-between">
                        <div className="animate__animated animate__fadeInUp animate__slower lg:pl-9 ">
                            <img src={img2} alt="vegitable" />
                        </div>
                        <div className="flex-1 lg:pl-16 wow animate__animated animate__fadeInUp  animate__slower" data-wow-duration="2s" data-wow-delay=".3s">
                            <h2 className="lg:text-6xl text-2xl font-bold my-6">Organic Foods & Vegetables</h2>
                            <p className="my-6">25 Years of experience in agriculture farming</p>
                            <PrimaryButton text={"Shop Now"}></PrimaryButton>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;