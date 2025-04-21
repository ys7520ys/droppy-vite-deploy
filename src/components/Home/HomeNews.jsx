import { React, useEffect, useState, useRef } from "react";
import "aos/dist/aos.css";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeNews } from "../../constants/data/home";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeNews = () => {

    const sectionRef = useRef();

    useLayoutEffect(() => {
        let ctx;
        const setAnimation = () => {
            if(ctx) ctx.revert();
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth <= 960;
                if (isMobile) {
                    gsap.utils.toArray(".box").forEach((box, i) => {
                        gsap.from(box, {
                            y: 80,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0.2,  
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: box,
                                start: "top 110%",
                                toggleActions: "play none none none"
                            }
                        });
                    });
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    },200)
                } else {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                            toggleActions: "play none none none"
                        }
                    })
                    tl.delay(1)
                    tl.from([".box1",".box2",".box3"], {
                        opacity: 0,
                        y: 100,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.15
                    });
                }
            },sectionRef);
        };
        setAnimation();
        const handleResize = () => {
            setAnimation();
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            if(ctx) ctx.revert();
            window.removeEventListener("resize", handleResize);
        }
    },[])



    // const [homeNews__title, Set_homeNews__title] = useState({
    //     title: { effect: "fade-up", effectOffset: "100" },
    // })
    // const [contentBox1, Set_contentBox1] = useState({
    //     content1: { effect: "fade-up", delay: "100" }
    // })
    // const [contentBox2, Set_contentBox2] = useState({
    //     content2: { effect: "fade-up", delay: "100" }
    // })
    // const [contentBox3, Set_contentBox3] = useState({
    //     content3: { effect: "fade-up", delay: "100" }
    // })

    // useEffect(() => {
    //     const updateAOS = () => {
    //         Set_homeNews__title({
    //             title: window.innerWidth <= 960
    //                 ? { effect: "fade-up", effectOffset: "50" }
    //                 : { effect: "slide-up", effectOffset: "100" },
    //         });
    //         Set_contentBox1({
    //             content1: window.innerWidth <= 960
    //                 ? { effect: "fade-up", effectOffset: "100", delay: "0" }
    //                 : { effect: "fade-up", effectOffset: "100", delay: "100" }
    //         });
    //         Set_contentBox2({
    //             content2: window.innerWidth <= 960
    //                 ? { effect: "fade-up", effectOffset: "100", delay: "0" }
    //                 : { effect: "fade-up", effectOffset: "100", delay: "200" }
    //         });
    //         Set_contentBox3({
    //             content3: window.innerWidth <= 960
    //                 ? { effect: "fade-up", effectOffset: "100", delay: "0" }
    //                 : { effect: "fade-up", effectOffset: "100", delay: "300" }
    //         });
    //         setTimeout(() => {
    //             Aos.refreshHard();
    //         }, 100);
    //     };
    //     updateAOS();
    //     window.addEventListener("resize", updateAOS);
    //     return () => {
    //         window.removeEventListener("resize", updateAOS);
    //     }
    // }, [])
    return (
        <section ref={sectionRef} className="homeNews">
            <p className="sr-only">CJ ENM 작품들의 새로운 소식들을 확인하세요.</p>
            <h4 
                className="homeNews__title" 
                // data-aos={homeNews__title.title.effect} 
                // data-aos-offSet={homeNews__title.title.effectOffset}
            >
                새로운 소식
            </h4>
            <div className="homeNews__contents">
                <Link
                    to="/detail"
                    tabIndex="0"
                    // data-aos={contentBox1.content1.effect}
                    // data-aos-delay={contentBox1.content1.delay}
                    // data-aos-offSet={contentBox1.content1.effectOffset}
                    className="content box box1"
                >
                    <div className="content__imgBox">
                        <img 
                            className="content__imgBox-img" 
                            src={homeNews.news_img[0].img} 
                            alt={homeNews.news_img[0].alt} 
                        />
                    </div>
                    <div className="content__infoBox">
                        <p className="content__infoBox-text" aria-hidden="true">
                            {homeNews.news_text[0]}
                        </p>
                    </div>
                </Link>
                <Link 
                    to="/detail"
                    tabIndex="0" 
                    // data-aos={contentBox2.content2.effect} 
                    // data-aos-delay={contentBox2.content2.delay} 
                    // data-aos-offSet={contentBox2.content2.effectOffset} 
                    className="content box box2"
                >
                    <div className="content__imgBox">
                        <img 
                            className="content__imgBox-img" 
                            src={homeNews.news_img[1].img} 
                            alt={homeNews.news_img[1].alt} 
                        />
                    </div>
                    <div className="content__infoBox">
                        <p className="content__infoBox-text" aria-hidden="true">
                            {homeNews.news_text[1]}
                        </p>
                    </div>
                </Link>
                <Link 
                    to="/detail"
                    tabIndex="0" 
                    // data-aos={contentBox3.content3.effect} 
                    // data-aos-delay={contentBox3.content3.delay} 
                    // data-aos-offSet={contentBox3.content3.effectOffset} 
                    className="content box box3"
                >
                    <div className="content__imgBox">
                        <img 
                            className="content__imgBox-img" 
                            src={homeNews.news_img[2].img} 
                            alt={homeNews.news_img[2].alt}      
                        />
                    </div>
                    <div className="content__infoBox">
                        <p className="content__infoBox-text" aria-hidden="true">
                            {homeNews.news_text[2]}
                        </p>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default HomeNews;