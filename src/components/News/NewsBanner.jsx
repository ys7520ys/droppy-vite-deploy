import { React, useEffect, useLayoutEffect, useRef } from "react";
// import { newData } from "../../constants";
import { newsBanner } from "../../constants/data/news";
import gsap from "gsap";

const NewsBanner = () => {
    const sectionRef = useRef();
    // 모바일의 값에서는 translateX가 아닌 translateY의 값으로 등장해야 한다. 
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
    
    
    // useLayoutEffect(() => {
    //     let ctx = gsap.context(() => {
    //         gsap.from(".boxTitle", {
    //             opacity: 0,
    //             x: -100,
    //             delay: 0.5,
    //             duration: 0.6,
    //             ease: "power1.out",
    //         });  
    //         gsap.from(".boxSubtitle", {
    //             opacity: 0,
    //             x: -100,
    //             delay: 0.6,
    //             duration: 0.6,
    //             ease: "power1.out",
    //         });  
            
    //     }, sectionRef)
    //     return () => ctx.revert();
    // },[])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section 
            className="newsBanner" 
            role="banner"
            aria-hidden="true"
            ref={sectionRef}
        >
            <div className="newsBanner__titleArea">
                <h2 

                    className="newsBanner__titleArea-titleText boxTitle"
                >
                    {newsBanner.banner_text.title}
                </h2>
                <h3 

                    className="newsBanner__titleArea-subtitleText boxSubtitle"
                >
                    {newsBanner.banner_text.subTitle[0]}<span class="mobile-br" />
                    {newsBanner.banner_text.subTitle[1]}
                </h3>
            </div>
        </section>
    )
}

export default NewsBanner;