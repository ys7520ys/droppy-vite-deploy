import { React, useEffect, useState, useRef, useLayoutEffect } from "react";
import { newsGridCard } from "../../constants/data/news";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";

const NewsGridCard = () => {

    const sectionRef = useRef();
    useLayoutEffect(() => {
        let ctx;
        const setAnimation = () => {
            if(ctx) ctx.revert();
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth <= 960;
                if (isMobile) {
                    const boxes = gsap.utils.toArray(".mobileBox");
                    gsap.utils.toArray(".mobileBox").forEach((box, i) => {
                        gsap.from(box, {
                            y: 40,
                            opacity: 0,
                            duration: 0.6,
                            delay: 0.2,
                            ease: "power1.out",
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
                    gsap.from(".pcBox", {
                        opacity: 0,
                        y: 50,
                        delay: 1,
                        duration: 0.5,
                        ease: "power1.out",
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

    return (
        <section
            className="newsGridCard showBox"
            ref={sectionRef}
        >
            <div
                className="newsGridCard__contents"
            >
                {newsGridCard.gridCard_img.map((img, index) => (
                    <Link
                        to="/detail"
                        className="item mobileBox pcBox"
                        key={index}
                        tabIndex="0"
                    >
                        <div className="item__img">
                            <img src={img.img} alt={img.alt} />
                        </div>
                        <div className="item__text" aria-hidden="true">
                            {newsGridCard.gridCard_text[index]}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default NewsGridCard;