import React, { useEffect, useState } from "react";
import { swiperSettings1 } from "../../constants";
import { aboutSwiper } from "../../constants/data/about";
import { Swiper, SwiperSlide } from "swiper/react";
import Aos from "aos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const AboutSwiper = () => {
    const [aboutSwiper__block_title, Set_aboutSwiper__block_title] = useState({
        title: { effect: "fade-up", effectOffset: "400", effectDelay: "100" }
    })
    const [aboutSwiper__block_subtitle, Set_aboutSwiper__block_subtitle] = useState({
        subtitle: { effect: "fade-up", effectOffset: "350", effectDelay: "200" }
    })
    const [swiperArea, Set_swiperArea] = useState({
        swiper: { effect: "zoom-out", effectOffset: "100" }
    })
    useEffect(() => {
        const updateAOS = () => {
            Set_aboutSwiper__block_title({
                title: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "0", effectDelay: "100" }
                    : { effect: "fade-up", effectOffset: "50", effectDelay: "100" }
            })
            Set_aboutSwiper__block_subtitle({
                subtitle: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "0", effectDelay: "100" }
                    : { effect: "fade-up", effectOffset: "100", effectDelay: "200" }
            })
            Set_swiperArea({
                swiper: window.innerWidth <= 960
                    ? { effect: "zoom-out", effectOffset: "0" }
                    : { effect: "zoom-out", effectOffset: "100" }
            });
            setTimeout(() => {
                Aos.refreshHard(); // ✅ 강제 AOS 재적용
            }, 100);
        };
        updateAOS();
        window.addEventListener("resize", updateAOS);

        return () => {
            window.removeEventListener("resize", updateAOS);
        }
    }, [])

    return (
        <section className="aboutSwiper">
            <div className="aboutSwiper__block">
                <h3
                    className="aboutSwiper__block-title"
                    data-aos={aboutSwiper__block_title.title.effect}
                    data-aos-offset={aboutSwiper__block_title.title.effectOffset}
                    data-aos-delay={aboutSwiper__block_title.title.effectDelay}
                    aria-labelledby="aboutSwiper-title-part1-1 aboutSwiper-title-part1-2"
                >
                    <span id="aboutSwiper-title-part1-1">{aboutSwiper.swiper_text.title.first[0]}</span><br />
                    <span id="aboutSwiper-title-part1-2">{aboutSwiper.swiper_text.title.first[1]}</span>
                </h3>
                <h4
                    className="aboutSwiper__block-subtitle"
                    data-aos={aboutSwiper__block_subtitle.subtitle.effect}
                    data-aos-offset={aboutSwiper__block_subtitle.subtitle.effectOffset}
                    data-aos-delay={aboutSwiper__block_subtitle.subtitle.effectDelay}
                >
                    {aboutSwiper.swiper_text.subtitle[0]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[1]}
                </h4>
                <Swiper 
                    className="swiperArea" 
                    {...swiperSettings1} 
                    data-aos={swiperArea.swiper.effect} 
                    data-aos-offset={swiperArea.swiper.effectOffset}
                    aria-hidden="true"
                >
                    {aboutSwiper.swiper_img.first.map((img, index) => (
                        <SwiperSlide tabIndex="0" className="swiperArea__swiperSlide" key={index}>
                            <img className="swiperArea__swiperSlide-img" src={img.img} alt={img.alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="aboutSwiper__block">
                <h3
                    className="aboutSwiper__block-title"
                    data-aos={aboutSwiper__block_title.title.effect}
                    data-aos-offset={aboutSwiper__block_title.title.effectOffset}
                    data-aos-delay={aboutSwiper__block_title.title.effectDelay}
                    aria-labelledby="aboutSwiper-title-part2-1 aboutSwiper-title-part2-2"
                >
                    <span id="aboutSwiper-title-part2-1">{aboutSwiper.swiper_text.title.second[0]}</span><br />
                    <span id="aboutSwiper-title-part2-2">{aboutSwiper.swiper_text.title.second[1]}</span>
                </h3>
                <h4
                    className="aboutSwiper__block-subtitle"
                    data-aos={aboutSwiper__block_subtitle.subtitle.effect}
                    data-aos-offset={aboutSwiper__block_subtitle.subtitle.effectOffset}
                    data-aos-delay={aboutSwiper__block_subtitle.subtitle.effectDelay}
                >
                    {aboutSwiper.swiper_text.subtitle[2]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[3]}
                </h4>
                <Swiper 
                    className="swiperArea" 
                    {...swiperSettings1} 
                    data-aos={swiperArea.swiper.effect} 
                    data-aos-offset={swiperArea.swiper.effectOffset}
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
                    data-aos={aboutSwiper__block_title.title.effect}
                    data-aos-offset={aboutSwiper__block_title.title.effectOffset}
                    data-aos-delay={aboutSwiper__block_title.title.effectDelay}
                    aria-labelledby="aboutSwiper-title-part3-1 aboutSwiper-title-part3-2"
                >
                    <span id="aboutSwiper-title-part3-1">{aboutSwiper.swiper_text.title.second[0]}</span><br />
                    <span id="aboutSwiper-title-part3-2">{aboutSwiper.swiper_text.title.second[1]}</span>
                </h3>
                <h4
                    className="aboutSwiper__block-subtitle"
                    data-aos={aboutSwiper__block_subtitle.subtitle.effect}
                    data-aos-offset={aboutSwiper__block_subtitle.subtitle.effectOffset}
                    data-aos-delay={aboutSwiper__block_subtitle.subtitle.effectDelay}
                >
                    {aboutSwiper.swiper_text.subtitle[4]}<span class="mobile-br" />
                    {aboutSwiper.swiper_text.subtitle[5]}
                </h4>
                <Swiper 
                    className="swiperArea" 
                    {...swiperSettings1} 
                    data-aos={swiperArea.swiper.effect} 
                    data-aos-offset={swiperArea.swiper.effectOffset}
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

export default AboutSwiper;
