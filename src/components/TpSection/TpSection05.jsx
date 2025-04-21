import React, { useEffect, useState } from "react";
import { swiperSettings1 } from "../../constants";
import { aboutSwiper } from "../../constants/data/about";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Tpsection02 from "./TpSection02";

const Tpsection05 = () => {

    return (
        <section className="aboutSwiper">
            <div className="aboutSwiper__block">
                <h3
                    className="aboutSwiper__block-title"
                    aria-labelledby="aboutSwiper-title-part1-1 aboutSwiper-title-part1-2"
                >
                    <span id="aboutSwiper-title-part1-1">{aboutSwiper.swiper_text.title.first[0]}</span><br />
                    <span id="aboutSwiper-title-part1-2">{aboutSwiper.swiper_text.title.first[1]}</span>
                </h3>
                <h4 className="aboutSwiper__block-subtitle">
                    {aboutSwiper.swiper_text.subtitle[0]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[1]}
                </h4>
                <Swiper className="swiperArea" {...swiperSettings1} aria-hidden="true"
                >
                    {aboutSwiper.swiper_img.first.map((img, index) => (
                        <SwiperSlide tabIndex="0" className="swiperArea__swiperSlide" key={index}>
                            <img className="swiperArea__swiperSlide-img" src={img.img} alt={img.alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="aboutSwiper__block">
                <h3 className="aboutSwiper__block-title"aria-labelledby="aboutSwiper-title-part2-1 aboutSwiper-title-part2-2">
                    <span id="aboutSwiper-title-part2-1">{aboutSwiper.swiper_text.title.second[0]}</span><br />
                    <span id="aboutSwiper-title-part2-2">{aboutSwiper.swiper_text.title.second[1]}</span>
                </h3>
                <h4
                    className="aboutSwiper__block-subtitle"
                >
                    {aboutSwiper.swiper_text.subtitle[2]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[3]}
                </h4>
                <Swiper 
                    className="swiperArea" 
                    {...swiperSettings1} 
                    aria-hidden="true"
                >
                    {aboutSwiper.swiper_img.second.map((img, index) => (
                        <SwiperSlide tabIndex="0" className="swiperArea__swiperSlide" key={index}>
                            <img className="swiperArea__swiperSlide-img" src={img.img} alt={img.alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="aboutSwiper__block">
                <h3
                    className="aboutSwiper__block-title"
                    aria-labelledby="aboutSwiper-title-part3-1 aboutSwiper-title-part3-2"
                >
                    <span id="aboutSwiper-title-part3-1">{aboutSwiper.swiper_text.title.second[0]}</span><br />
                    <span id="aboutSwiper-title-part3-2">{aboutSwiper.swiper_text.title.second[1]}</span>
                </h3>
                <h4
                    className="aboutSwiper__block-subtitle"

                >
                    {aboutSwiper.swiper_text.subtitle[4]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[5]}
                </h4>
                <Swiper 
                    className="swiperArea" 
                    {...swiperSettings1} 
                    aria-hidden="true"
                >
                    {aboutSwiper.swiper_img.third.map((img, index) => (
                        <SwiperSlide tabIndex="0" className="swiperArea__swiperSlide" key={index}>
                            <img className="swiperArea__swiperSlide-img" src={img.img} alt={img.alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Tpsection05;
