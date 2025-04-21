import { React,useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { assetBanner } from "../../constants/data/asset";
import { assetGridCard } from "../../constants/data/asset";

const AssetBanner = ({ onCategoryChangeImg, onCategoryChangeText, onCategoryChangeSrOnly,categoryChangeCheck, selectedCategory_text }) => {

    const [btnActive, setBtnActive] = useState(false);

    const btnToggle = () => {
        setBtnActive((prev) => !prev);
    }

    useEffect(() => {
        onCategoryChangeImg(btnActive ? assetGridCard.gridCard_img.ani : assetGridCard.gridCard_img.tv);
        onCategoryChangeText(btnActive ? assetBanner.banner_text.ani : assetBanner.banner_text.tv);
        onCategoryChangeSrOnly(btnActive ? "애니메이션" : "TV프로그램");    

    },[btnActive]);

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
                    gsap.from(".slideBtn", {
                        y: 20,
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
                    gsap.from(".slideBtn", {
                        x: 40,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.8,
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
    },[]);

    return (
        <section 
            className="assetBanner" 
            ref={sectionRef}
        >
            <div aria-live="polite" className="sr-only">
                어셋 페이지로 이동하였습니다.
            </div>

            <div className="assetBanner__titleArea">
                <h2
                    className="assetBanner__titleArea-titleText boxTitle"
                    // data-aos="fade-right"
                    // data-aos-duration="1100"
                    // data-aos-delay="100"
                    aria-hidden="true"
                >
                    {assetBanner.banner_text.title}
                </h2>
                <h3
                    className="assetBanner__titleArea-subtitleText boxSubtitle"
                    // data-aos="fade-right"
                    // data-aos-duration="1100"
                    // data-aos-delay="200"
                    aria-hidden="true"
                >
                    {selectedCategory_text[0]}<span class="mobile-br" />
                    {selectedCategory_text[1]}<span class="mobile-br" />
                    {selectedCategory_text[2]}
                </h3>
                <div
                    className="slideBtn"
                    // data-aos="fade-left"
                    // data-aos-duration="1100"
                    // data-aos-delay="600"
                    onClick={btnToggle}
                >
                    <button 
                        className={`slideBtn__box ${btnActive ? "active" : ""}`} 
                        aria-label="해당 버튼을 통해서 카테고리를 변경하여 모든 작품들을 확인하세요."
                        role="button"
                    />
                    <p className="slideBtn__text-tv" aria-hidden="true">
                        TV 방송
                    </p>
                    <p className="slideBtn__text-ani" aria-hidden="true">
                        애니메이션
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AssetBanner;