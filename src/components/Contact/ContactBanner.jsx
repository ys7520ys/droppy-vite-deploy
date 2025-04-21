import { React, useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { contactBanner } from "../../constants/data/contact";

const ContactBanner = () => {
    const sectionRef = useRef();
    useLayoutEffect(() => {
        let ctx;
        const setAnimation = () => {
            if(ctx) ctx.revert();
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth <= 1260;
                if (isMobile) {
                    gsap.from(".boxTitle", {
                        y: 40,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.3,
                        ease: "power1.out",
                    });
                    gsap.from(".boxSubtitle", {
                        y: 40,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.4,
                        ease: "power1.out",
                    });
                } else {
                    gsap.from(".boxTitle", {
                        x: -100,
                        opacity: 0,
                        duration: 0.7,
                        delay: 0.3,
                        ease: "power1.out",
                    });
                    gsap.from(".boxSubtitle", {
                        x: -100,
                        opacity: 0,
                        duration: 0.7,
                        delay: 0.4,
                        ease: "power1.out",
                    });
                }
            },sectionRef);
        };
        setAnimation();
        const handleResize = () => {
            setAnimation();
            // ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            if(ctx) ctx.revert();
            window.removeEventListener("resize", handleResize);
        }
    },[])


    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <section 
            className="contactBanner" 
            aria-hidden="true"
            ref={sectionRef}
        >
            <div className="contactBanner__titleArea">
                <h2
                    className="contactBanner__titleArea-title boxTitle"
                >
                    {contactBanner.banner_text.title}
                </h2>
                <h3
                    className="contactBanner__titleArea-subtitle boxSubtitle"

                >
                    {contactBanner.banner_text.subTitle[0]}<span class="mobile-br" />
                    {contactBanner.banner_text.subTitle[1]}
                </h3>
            </div>
        </section>
    )
}

export default ContactBanner;