import { React, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { mainData } from "../../constants";
import { homeMainLicense } from "../../constants/data/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// width: 960px 이상에서 작동할 AOS 기본값
const HomeMainLicense = () => {
    // 향후 구성한 gsap의 className의 이름은 다시 수정해야 한다.
    // L> ex) box, box1, box111, boxTitle, boxSubtitle
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
                                start: "top 100%",
                                toggleActions: "play none none none"
                            }
                        });
                    });
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    },200)
                } else {
                    gsap.from([".box1",".box2",".box3"], {
                        scrollTrigger: {
                            trigger: ".box1",
                            start: "top 90%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 100,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.15
                    });
                    gsap.from([".box11",".box22",".box33",".box44"], {
                        scrollTrigger: {
                            trigger: ".box11",
                            start: "top 100%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 100,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.15
                    });
                    gsap.from([".box111",".box222",".box333"], {
                        scrollTrigger: {
                            trigger: ".box111",
                            start: "top 90%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 100,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.15
                    });
                    gsap.from([".box1111",".box2222",".box3333",".box4444"], {
                        scrollTrigger: {
                            trigger: ".box1111",
                            start: "top 100%",
                            toggleActions: "play none none none"
                        },
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
    return (
        <section ref={sectionRef} className="homeMainLicense">
            <p className="sr-only">CJ ENM이 가지고 있는 메인라이센스 작품들을 확인하세요.</p>
            <div
                className="homeMainLicense__headerLine"
            >   
                <h4 className="homeMainLicense__headerLine-title" aria-hidden="true">메인 라이센스</h4>
                <button className="homeMainLicense__headerLine-viewAllBtn" aria-label="버튼을 통해서 CJ ENM과 함께하는 모든 작품들을 확인하세요.">
                    전체보기
                </button>
            </div>
            <div className="homeMainLicense__contents">
                <div className="homeMainLicense__contents-top">
                    <Link
                        to="/detail"
                        tabIndex="0"
                        className="content__large box box1"
                        aria-label="스트릿 우먼 파이터2 상세보기"
                    >
                        <div className="content__large-categoryBox" aria-hidden="true">
                            Entertainment Shows
                        </div>
                        <div className="content__large-imgBox">
                            <img 
                                src={homeMainLicense.mainLicense_img[0].img} 
                                alt={homeMainLicense.mainLicense_img[0].alt} 
                                className="content__left-img" 
                            />
                        </div>
                        <div className="content__large-hoverBox" aria-hidden="true">
                            <div className="hoverTextBox">
                                <div className="hoverTextBox__title">프로그램 정보</div>
                                <div className="hoverTextBox__subtitle">
                                    <ul className="hoverTextBox__subtitle-parent">
                                        <li className="parent__list">장르</li>
                                        <li className="parent__list">방영기간</li>
                                        <li className="parent__list">연출</li>
                                        <li className="parent__list">CP</li>
                                        <li className="parent__list">출연진</li>
                                    </ul>
                                    <ul className="hoverTextBox__subtitle-children">
                                        <li className="children__list">음악</li>
                                        <li className="children__list">2023.08.22 ~</li>
                                        <li className="children__list">김지은</li>
                                        <li className="children__list">권영찬</li>
                                        <li className="children__list">울를러 +7</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="content__middleSmall">
                        <div className="middle">
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="middle__left box box2"
                                aria-label="유퀴즈 온더 블럭 상세 보기"
                            >
                                <div className="middle__left-categoryBox" aria-hidden="true">
                                    Entertainment Shows
                                </div>
                                <div className="middle__left-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[1].img} 
                                        alt={homeMainLicense.mainLicense_img[1].alt} 
                                    />
                                </div>
                                <div className="middle__left-hoverBox" aria-hidden="true">
                                    <div className="hoverTextBox">
                                        <div className="hoverTextBox__title">프로그램 정보</div>
                                        <div className="hoverTextBox__subtitle">
                                            <ul className="hoverTextBox__subtitle-parent">
                                                <li className="parent__list">장르</li>
                                                <li className="parent__list">방영기간</li>
                                                <li className="parent__list">연출</li>
                                                <li className="parent__list">CP</li>
                                                <li className="parent__list">출연진</li>
                                            </ul>
                                            <ul className="hoverTextBox__subtitle-children">
                                                <li className="children__list">예능</li>
                                                <li className="children__list">2018.08.29 ~</li>
                                                <li className="children__list">이기연</li>
                                                <li className="children__list">박희연</li>
                                                <li className="children__list">유재석, 조세호</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="middle__right box box3"
                                aria-label="기생충 상세보기"
                            >
                                <div className="middle__right-categoryBox" aria-hidden="true">
                                    Movies
                                </div>
                                <div className="middle__right-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[2].img} 
                                        alt={homeMainLicense.mainLicense_img[2].alt} 
                                    />
                                </div>
                                <div className="middle__left-hoverBox" aria-hidden="true">
                                    <div className="hoverTextBox">
                                        <div className="hoverTextBox__title">프로그램 정보</div>
                                        <div className="hoverTextBox__subtitle">
                                            <ul className="hoverTextBox__subtitle-parent">
                                                <li className="parent__list">장르</li>
                                                <li className="parent__list">개봉일</li>
                                                <li className="parent__list">감독</li>
                                                <li className="parent__list">극본</li>
                                                <li className="parent__list">출연진</li>
                                                <li className="parent__list">제작사</li>
                                            </ul>
                                            <ul className="hoverTextBox__subtitle-children">
                                                <li className="children__list">영화</li>
                                                <li className="children__list">2019.05.30</li>
                                                <li className="children__list">봉준호</li>
                                                <li className="children__list">봉준호, 한진원</li>
                                                <li className="children__list">송강호 +6</li>
                                                <li className="children__list">바른손이앤에이</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="small">
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__first box box11"
                                aria-label="뿅뿅 지구 오락실2 상세보기"
                            >
                                <div className="small__first-categoryBox"></div>
                                <div className="small__first-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[6].img}
                                        alt={homeMainLicense.mainLicense_img[6].alt}
                                    />
                                </div>
                                <div className="small__first-textBox"  aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[0]}</p>
                                    <p className="text__en">Entertainment Shows</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__second box box22"
                                aria-label="댄스가수 유랑단 상세보기"
                            >
                                <div className="small__second-categoryBox"></div>
                                <div className="small__second-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[7].img} 
                                        alt={homeMainLicense.mainLicense_img[7].alt} 
                                    />
                                </div>
                                <div className="small__second-textBox" aria-hidden="true">
                                    <p className="text__ko" aria-hidden="true">{homeMainLicense.mainLicense_text.smallBox_text[1]}</p>
                                    <p className="text__en" aria-hidden="true">Entertainment Shows</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"    
                                tabIndex="0"
                                className="small__third box box33"
                                aria-label="보이즈 플래닛 상세보기"
                            >
                                <div className="small__third-categoryBox"></div>
                                <div className="small__third-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[8].img} 
                                        alt={homeMainLicense.mainLicense_img[8].alt} 
                                    />
                                </div>
                                <div className="small__third-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[2]}</p>
                                    <p className="text__en">Entertainment Shows</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__fourth box box44"
                                aria-label="헤어질 결심 상세보기"
                            >
                                <div className="small__fourth-categoryBox"></div>
                                <div className="small__fourth-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[9].img} 
                                        alt={homeMainLicense.mainLicense_img[9].alt} 
                                    />
                                </div>
                                <div className="small__fourth-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[3]}</p>
                                    <p className="text__en">Entertainment Shows</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="homeMainLicense__contents-bottom">
                    <div className="content__middleSmall">
                        <div className="middle">
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="middle__left box box111"
                                aria-label="히어로 인사이드 상세보기"
                            >
                                <div className="middle__left-categoryBox" aria-hidden="true">
                                    Animation
                                </div>
                                <div className="middle__left-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[3].img} 
                                        alt={homeMainLicense.mainLicense_img[3].alt} 
                                    />
                                </div>
                                <div className="middle__left-hoverBox" aria-hidden="true">
                                    <div className="hoverTextBox">
                                        <div className="hoverTextBox__title">프로그램 정보</div>
                                        <div className="hoverTextBox__subtitle">
                                            <ul className="hoverTextBox__subtitle-parent">
                                                <li className="parent__list">장르</li>
                                                <li className="parent__list">방영기간</li>
                                                <li className="parent__list"><br /></li>
                                                <li className="parent__list">제작사</li>
                                            </ul>
                                            <ul className="hoverTextBox__subtitle-children">
                                                <li className="children__list">키즈</li>
                                                <li className="children__list">2023.10.11 2023.12.31</li>
                                                <li className="children__list">밀리언볼트</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="middle__right box box222"
                                aria-label="명탐정 코난 할로윈의 신부 상세보기"
                            >
                                <div className="middle__right-categoryBox" aria-hidden="true">
                                    Animation
                                </div>
                                <div className="middle__right-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[4].img} 
                                        alt={homeMainLicense.mainLicense_img[4].alt} 
                                    />
                                </div>
                                <div className="middle__right-hoverBox" aria-hidden="true">
                                    <div className="hoverTextBox">
                                        <div className="hoverTextBox__title">프로그램 정보</div>
                                        <div className="hoverTextBox__subtitle">
                                            <ul className="hoverTextBox__subtitle-parent">
                                                <li className="parent__list">장르</li>
                                                <li className="parent__list">제작사</li>
                                            </ul>
                                            <ul className="hoverTextBox__subtitle-children">
                                                <li className="children__list">청소년</li>
                                                <li className="children__list">TMS (ETM)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="small">
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__first box box1111"
                                aria-label="마카 앤 로니2 상세보기"
                            >
                                <div className="small__first-categoryBox"></div>
                                <div className="small__first-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[10].img} 
                                        alt={homeMainLicense.mainLicense_img[10].alt} 
                                    />
                                </div>
                                <div className="small__first-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[4]}</p>
                                    <p className="text__en">Animation</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__second box box2222"
                                aria-label="뿡뿡빵빵 부부맨 상세보기"
                            >
                                <div className="small__second-categoryBox"></div>
                                <div className="small__second-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[11].img} 
                                        alt={homeMainLicense.mainLicense_img[11].alt} 
                                    />
                                </div>
                                <div className="small__second-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[5]}</p>
                                    <p className="text__en">Animation</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__third box box3333"
                                aria-label="무한의 계단 상세보기"
                            >
                                <div className="small__third-categoryBox"></div>
                                <div className="small__third-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[12].img} 
                                        alt={homeMainLicense.mainLicense_img[12].alt} 
                                    />
                                </div>
                                <div className="small__third-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[6]}</p>
                                    <p className="text__en">Animation</p>
                                </div>
                            </Link>
                            <Link
                                to="/detail"
                                tabIndex="0"
                                className="small__fourth box box4444"
                                aria-label="뱀파이어소녀 달자 상세보기"
                            >
                                <div className="small__fourth-categoryBox"></div>
                                <div className="small__fourth-imgBox">
                                    <img 
                                        src={homeMainLicense.mainLicense_img[13].img} 
                                        alt={homeMainLicense.mainLicense_img[13].alt} 
                                    />
                                </div>
                                <div className="small__fourth-textBox" aria-hidden="true">
                                    <p className="text__ko">{homeMainLicense.mainLicense_text.smallBox_text[7]}</p>
                                    <p className="text__en">Animation</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <Link
                        to="/detail"
                        tabIndex="0"
                        className="content__large box box333"
                        aria-label="신비아파트 상세보기"
                    >
                        <div className="content__large-categoryBox" aria-hidden="true">
                            Animation
                        </div>
                        <div className="content__large-imgBox">
                            <img 
                                src={homeMainLicense.mainLicense_img[5].img} 
                                alt={homeMainLicense.mainLicense_img[5].alt} 
                                className="contnet__right-img" 
                            />
                        </div>
                        <div className="content__large-hoverBox" aria-hidden="true">
                            <div className="hoverTextBox">
                                <div className="hoverTextBox__title">프로그램 정보</div>
                                <div className="hoverTextBox__subtitle">
                                    <ul className="hoverTextBox__subtitle-parent">
                                        <li className="parent__list">장르</li>
                                        <li className="parent__list">방영기간</li>
                                        <li className="parent__list"><br /></li>
                                        <li className="parent__list">제작사</li>
                                    </ul>
                                    <ul className="hoverTextBox__subtitle-children">
                                        <li className="children__list">키즈</li>
                                        <li className="children__list">2023.03.20 2023.06.15</li>
                                        <li className="children__list">스튜디오 바주카</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeMainLicense;