import { React, useEffect } from "react";
import { aboutBanner } from "../../constants/data/about";

const AboutBanner = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <section 
            className="aboutBanner" 
            aria-hidden="true"
        >
            <div className="aboutBanner__content">
                <img 
                    className="aboutBanner__content-char" 
                    src={aboutBanner.banner_img} 
                    alt=""
                />
                <div 
                    className="speechBubble" 
                    data-aos="fade-up" 
                    data-aos-delay="1500"
                >
                    <h2 
                        className="speechBubble__text" 
                    >
                        {aboutBanner.banner_text}
                    </h2>
                    <div className="speechBubble__deco" />
                </div>
            </div>
        </section>
    )
}

export default AboutBanner;     