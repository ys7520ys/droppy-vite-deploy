import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { aboutNumber } from "../../constants/data/about";

const AboutNumber = () => {
    const [aboutNumber__companyInfo_title, Set_aboutNumber__companyInfo_title] = useState({
        title: { effect: "fade-up", effectOffset: "0", duration: "500" },
    })
    const [aboutNumber__companyInfo_subtitle, Set_aboutNumber__companyInfo_subtitle] = useState({
        subTitle: { effect: "fade-up", effectOffset: "100", effectDelay: "200" }
    })
    const [aboutNumber__numBox_title, Set_aboutNumber__numBox_title] = useState({
        numBox: { effect: "fade-up", effectOffset: "200", effectDelay: "600" }
    })
    const [content01, Set_content01] = useState({
        num01: { effect: "fade-up", effectOffset: "200", effectDelay: "100", duration: "1800" }
    })
    const [content02, Set_content02] = useState({
        num02: { effect: "fade-up", effectOffset: "200", effectDelay: "200", duration: "1800" }
    })
    const [content03, Set_content03] = useState({
        num03: { effect: "fade-up", effectOffset: "200", effectDelay: "300", duration: "1800" }
    })
    useEffect(() => {
        const updateAOS = () => {
            Set_aboutNumber__companyInfo_title({
                title: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", duration: "100" }
                    : { effect: "fade-up", effectOffset: "0", duration: "100" },
            });
            Set_aboutNumber__companyInfo_subtitle({
                subTitle: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", effectDelay: "100" }
                    : { effect: "fade-up", effectOffset: "100", effectDelay: "200" },
            });
            Set_aboutNumber__numBox_title({
                numBox: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", effectDelay: "100" }
                    : { effect: "fade-up", effectOffset: "200", effectDelay: "600" },
            });
            Set_content01({
                num01: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", effectDelay: "100", duration: "1000" }
                    : { effect: "fade-up", effectOffset: "200", effectDelay: "100", duration: "1800" },
            });
            Set_content02({
                num02: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", effectDelay: "200", duration: "1000" }
                    : { effect: "fade-up", effectOffset: "200", effectDelay: "200", duration: "1800" }
            });
            Set_content03({
                num03: window.innerWidth <= 960
                    ? { effect: "fade-up", effectOffset: "50", effectDelay: "300", duration: "1000" }
                    : { effect: "fade-up", effectOffset: "200", effectDelay: "300", duration: "1800" }
            });
        };
        updateAOS();
        window.addEventListener("resize", updateAOS);

        return () => {
            window.removeEventListener("resize", updateAOS);
        }
    }, [])

    const numberRefs = [useRef(null), useRef(null), useRef(null)];
    const targetRefs = [useRef(null), useRef(null), useRef(null)];
    const endValues = [180, 150, 3000];
    useEffect(() => {
        const observerOptions = {
            root: null,
        };
        const observerCallback = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    gsap.to(numberRefs[index].current, {
                        duration: 2,
                        textContent: endValues[index],
                        roundProps: "textContent",
                        ease: "power1.out",
                    });
                    observer.unobserve(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        targetRefs.forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <section className="aboutNumber">
            <div className="aboutNumber__companyInfo">
                <h3
                    className="aboutNumber__companyInfo-title"
                    data-aos={aboutNumber__companyInfo_title.title.effect}
                    data-aos-offset={aboutNumber__companyInfo_title.title.effectOffset}
                    data-aos-delay={aboutNumber__companyInfo_title.title.effectDelay}
                    aria-labelledby="aboutBanner-title-part1 aboutBanner-title-part2"
                >
                    <span id="aboutBanner-title-part1">{aboutNumber.number_text.title[0]}</span><br/>
                    <span id="aboutBanner-title-part2">{aboutNumber.number_text.title[1]}</span>
                </h3>
                <h4
                    className="aboutNumber__companyInfo-subtitle"
                    data-aos={aboutNumber__companyInfo_subtitle.subTitle.effect}
                    data-aos-offset={aboutNumber__companyInfo_subtitle.subTitle.effectOffset}
                    data-aos-delay={aboutNumber__companyInfo_subtitle.subTitle.effectDelay}
                >
                    {aboutNumber.number_text.subtitle[0]}<span class="mobile-br" />
                    {aboutNumber.number_text.subtitle[1]}
                </h4>
            </div>
            <div className="aboutNumber__numBox">

                <p className="sr-only">해당 회사가 이룬 성과들을 알아보아요.</p>
                <h3
                    className="aboutNumber__numBox-title"
                    data-aos={aboutNumber__numBox_title.numBox.effect}
                    data-aos-offset={aboutNumber__numBox_title.numBox.effectOffset}
                    data-aos-delay={aboutNumber__numBox_title.numBox.effectDelay}
                    aria-hidden="true"
                >
                    IP LICENSING & MERCHANDISING
                </h3>
                <div className="aboutNumber__numBox-contents">
                    <p className="sr-only">가용 IP 180개 이상 달성</p>
                    <div
                        className="content"
                        data-aos={content01.num01.effect}
                        data-aos-offset={content01.num01.effectOffset}
                        data-aos-delay={content01.num01.effectDelay}
                        data-aos-duration={content01.num01.duration}
                        aria-hidden="true"
                        ref={targetRefs[0]
                    }>
                        <h4 className="content__subtitle">
                            가용 IP
                        </h4>
                        <p className="content__numChange">
                            <span ref={numberRefs[0]}>0</span>+
                        </p>
                    </div>

                    <p className="sr-only">누적거래 파트너사 150개 이상 달성</p>
                    <div
                        className="content"
                        data-aos={content02.num02.effect}
                        data-aos-offset={content02.num02.effectOffset}
                        data-aos-delay={content02.num02.effectDelay}
                        data-aos-duration={content02.num02.duration}
                        aria-hidden="true"
                        ref={targetRefs[1]}
                    >
                        <h4 className="content__subtitle">
                            누적 거래 파트너사
                        </h4>
                        <p className="content__numChange">
                            <span ref={numberRefs[1]}>0</span>+
                        </p>
                    </div>

                    <p className="sr-only">상품화 사례 3000개 이상 달성</p>
                    <div
                        className="content"
                        data-aos={content03.num03.effect}
                        data-aos-offset={content03.num03.effectOffset}
                        data-aos-delay={content03.num03.effectDelay}
                        data-aos-duration={content03.num03.duration}
                        aria-hidden="true"
                        ref={targetRefs[2]}
                    >
                        <h4 className="content__subtitle">
                            상품화 사례
                        </h4>
                        <p className="content__numChange">
                            <span ref={numberRefs[2]}>0</span>+
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutNumber;
