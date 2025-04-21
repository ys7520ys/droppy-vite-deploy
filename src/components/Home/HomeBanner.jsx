import { React, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { homeBanner } from "../../constants/data/home";

const HomeBanner = () => {
    const sectionRef = useRef();
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // 각 요소의 값에 딜레이의 값을 구성하여 순서대로 등장하게 구성하였다.
            gsap.from(".boxTitle", {
                opacity: 0,
                y: 50,
                delay: 1,
                duration: 0.4,
                ease: "power1.out",
            });
            gsap.from(".boxSubtitle", {
                opacity: 0,
                y: 50,
                delay: 1.15,
                duration: 0.4,
                ease: "power1.out",
            });
            gsap.from(".box1", {
                opacity: 0,
                y: -50,
                x: -50,
                delay: 0.2,
                duration: 0.5,
                ease: "power1.out",
           });
            gsap.from(".box2", {
                opacity: 0,
                y: -50,
                x: 50,
                delay: 0.4,
                duration: 0.5,
                ease: "power1.out",
            });
            gsap.from(".box3", {
                opacity: 0,
                y: 50,
                x: -50,
                delay: 0.6,
                duration: 0.5,
                ease: "power1.out",
            });
            gsap.from(".box4", {
                opacity: 0,
                y: 50,
                x: 50,
                delay: 0.8,
                duration: 0.5,
                ease: "power1.out",
            });

            
        }, sectionRef)
        return () => ctx.revert(); 
    },[])

    // banner이기 때문에 scrollTo가 존재한다.
    useEffect(() => {
        window.scrollTo(0,0);
    });
    return (
        <section 
            className="homeBanner" 
            aria-hidden="true"
            ref={sectionRef}
        >
            <div className="homeBanner__introAni">
                <div 
                    className="homeBanner__introAni-yellowMonster box1" 
                >
                    <img src={homeBanner.banner_img[0]} />
                </div>
                <div 
                    className="homeBanner__introAni-redCircle box2" 
                >
                    <img src={homeBanner.banner_img[1]} />
                </div>
                <div 
                    className="homeBanner__introAni-magic box3" 
                >
                    <img src={homeBanner.banner_img[2]} />
                </div>
                <div 
                    className="homeBanner__introAni-greenMonster box4" 
                >
                    <img src={homeBanner.banner_img[3]} />
                </div>
                <div className="homeBanner__mainTitle">
                    <h2 
                        className="homeBanner__mainTitle-title boxTitle" 
                    >
                        {homeBanner.banner_text.title}
                    </h2>
                    <h3 
                        className="homeBanner__mainTitle-subtitle boxSubtitle" 
                    >
                        {homeBanner.banner_text.subTitle}
                    </h3>
                </div>
            </div>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
        </section>
    )
}

export default HomeBanner;

