import React, { useEffect,useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Tpsection03() {

    const sectionRef = useRef();
    useLayoutEffect(() => {
        let ctx;
        const setAnimation = () => {
            if(ctx) ctx.revert();
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth <= 960;
                if (isMobile) {
                    gsap.from(".textAni",{
                        y: 40,
                        opacity: 0,
                        duration: 0.7,  
                        ease: "power2.out",
                        stagger: 0.5, 
                        scrollTrigger: {
                            trigger: ".textAni",
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    gsap.from(".tpSection03__textBox",{
                        y: 40,
                        opacity: 0,
                        duration: 0.7,  
                        ease: "power2.out", 
                        scrollTrigger: {
                            trigger: ".tpSection03__textBox",
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    gsap.from(".tpSection03__imgBox", {
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.6, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".tpSection03__imgBox",
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    },200)
                } else {
                    gsap.from(".textAni",{
                        x: -100,
                        opacity: 0,
                        duration: 0.7,  
                        ease: "power2.out",
                        stagger: 0.3, 
                        scrollTrigger: {
                            trigger: ".textAni",
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    gsap.from(".tpSection03__textBox",{
                        x: -100,
                        opacity: 0,
                        duration: 0.7,  
                        ease: "power2.out", 
                        scrollTrigger: {
                            trigger: ".tpSection03__textBox",
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    gsap.from(".tpSection03__imgBox", {
                        x: 100,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.3, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".tpSection03__imgBox",
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
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
      className="tpSection03"
      ref={sectionRef}
    >
        <div className="tpSection03__textBox">
            <div className="decoText">회사로고</div>
            <div className="titleText textAni">
                건강한 한끼를 위해서<br/>
                제대로된 식사를 제공합니다. 
            </div>
            <div className="subTitleText textAni">
                빠르게 끝내는 식사가 아닌,<br/>
                영양과 균형을 생각하는 식사입니다.
            </div>
            <button className="infoBtn">
                회사 스토리 보기
            </button>
        </div>
        <div className="tpSection03__imgBox">
            
        </div>
    </section>
  );
}

export default Tpsection03;