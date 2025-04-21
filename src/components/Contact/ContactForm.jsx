import { React, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ContactForm = () => {
    

    const sectionRef = useRef();
    // 모바일의 값에서는 translateX가 아닌 translateY의 값으로 등장해야 한다. 
    useLayoutEffect(() => {
        let ctx;
        const setAnimation = () => {
            if(ctx) ctx.revert();
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth <= 1260;
                if (isMobile) {
                    gsap.from(".mobileBox", {
                        y: 40,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.2,
                        ease: "power1.out",
                    });
                } else {
                    gsap.from(".pcBox", {
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        delay: 1,
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


    return (
        <section
            className="contactForm mobileBox pcBox"
            aria-labelledby=""
            ref={sectionRef}
        >
            <form 
                className="contactForm__box mobileBox pcBox"
            >
                <h4 className="contact__legend">문의자 정보</h4>

                <div className="contact__nameArea">
                    <div className="contact__nameArea-item">
                        <label htmlFor="user-firstName" className="contact__label">성</label>
                        <input 
                            id="user-firstName" 
                            name="firstName" 
                            className="contact__input" 
                            type="text" 
                        />
                    </div>
                    <div className="contact__nameArea-item">
                        <label htmlFor="user-lastName" className="contact__label">이름</label>
                        <input 
                            id="user-lastName" 
                            name="lastName" 
                            className="contact__input" 
                            type="text" 
                        />
                    </div>
                </div>

                <div className="contact__emailArea">
                    <label htmlFor="user-emailAdress" className="contact__label">이메일주소</label>
                    <input 
                        id="user-emailAdress" 
                        name="emailAdress" 
                        className="contact__input" 
                        type="text" 
                    />
                </div>

                <div className="contact__companyArea">
                    <label htmlFor="user-company" className="contact__label">소속(회사)</label>
                    <input 
                        id="user-company" 
                        name="companyName" 
                        className="contact__input" 
                        type="text" 
                    />
                </div>

                <div className="contact__companywebArea">
                    <label htmlFor="user-companyWeb" className="contact__label">소속회사 웹페이지</label>
                    <input 
                        id="user-companyWeb" 
                        name="companySite" 
                        className="contact__input" 
                        type="text" 
                    />
                </div>
                <div className="contact__country">
                    <label htmlFor="user-country" className="contact__label">국가</label>
                    <select id="user-country" className="contact__input">
                        <option value="선택하세요">선택</option>
                        <option value="첫 번째 옵션">첫 번째 옵션</option>
                        <option value="두 번째 옵션">두 번째 옵션</option>
                        <option value="세 번째 옵션">세 번째 옵션</option>
                    </select>
                </div>
                <div className="contact__phoneArea">
                    <div className="contact__phoneArea-block">
                        <label htmlFor="user-phoneNumber" className="contact__label">휴대전화번호</label>
                        <div className="contact__inputs">
                            <select id="user-phoneNumber" className="contact__inputs-input">
                                <option value="선택하세요">선택</option>
                                <option value="첫 번째 옵션">첫 번째 옵션</option>
                                <option value="두 번째 옵션">두 번째 옵션</option>
                                <option value="세 번째 옵션">세 번째 옵션</option>
                            </select>
                            <input className="contact__inputs-input" name="phoneSecond" type="text" />
                        </div>
                    </div>
                </div>

                <h4 className="contact__contentTitle">
                    문의 내용
                </h4>
                <div className="contact__contentArea">
                    <div className="contact__contentArea-item">
                        <label htmlFor="user-type" className="contact__label">문의유형</label>
                        <select id="optionSelect" className="contact__input">
                            <option value="선택하세요">선택</option>
                            <option value="첫 번째 옵션">첫 번째 옵션</option>
                            <option value="두 번째 옵션">두 번째 옵션</option>
                            <option value="세 번째 옵션">세 번째 옵션</option>
                        </select>
                    </div>
                    <div className="contact__contentArea-item">
                        <label htmlFor="user-topic" className="contact__label">주제</label>
                        <select id="optionSelect" className="contact__input">
                            <option value="선택하세요">선택</option>
                            <option value="첫 번째 옵션">첫 번째 옵션</option>
                            <option value="두 번째 옵션">두 번째 옵션</option>
                            <option value="세 번째 옵션">세 번째 옵션</option>
                        </select>
                    </div>
                </div>
                <div className="contact__titleArea">
                    <label htmlFor="user-inquiryTitle" className="contact__label">문의제목</label>
                    <input 
                        id="user-inquiryTitle" 
                        name="inquiryTitle" 
                        className="contact__input" 
                        type="text" 
                    />
                </div>
                <div className="contact__content">
                    <label htmlFor="user-inquiryContent" className="contact__label">문의내용</label>
                    <textarea id="user-inquiryContent" className="contact__input" />
                </div>
                <div className="fileThrow">
                    <h2 className="fileThrow__title">파일첨부</h2>
                    <h2 className="fileThrow__subTitle">
                        ※ 첨부 가능한 이미지 파일 확장자 : jp(e)g, gif, png(최대 5개 / 파일용량 : 5MB)
                    </h2>
                    <h2 className="fileThrow__subTitle">
                        ※ 개인정보가 포함된 파일은 첨부할 수 없습니다.
                    </h2>
                </div>
                <button className="file__btn" type="button" role="button">
                    파일 첨부
                </button>
                <div className="agreeArea">
                    <h2 className="agreeArea__title">[필수] 개인정 수집 이용 동의</h2>
                    <div className="agreeArea__info">
                        <ul>
                            <li>
                                1. 수집 및 이용 목적 : Contact Us 서비스 이용, 문의 접수 및 처리, 처리 결과 통보
                            </li>
                            <li>
                                2. 수집 항목 : 성명, 이메일주소, 소속(회사), 국가, 휴대전화번호
                            </li>
                            <li>
                                3. 보유 및 이용기간 : 접수처리 완료 시점으로부터 1개월 이내 또는 정보주체의 철회 요청일로부터 5일 이내
                            </li>
                            <li>
                                ※ 정보주체는 개인정보 수집/이용에 대한 동의를 거부하실 수 있는 권리가 있습니다. 단, 거부하실 경우 Contact Us
                                이용에 제한을 받으실 수 있습니다.
                            </li>
                        </ul>
                    </div>
                </div>
                <label className="agreeBtn">
                    <input 
                        type="radio" 
                        name="agree" 
                        value="agree" 
                    />
                    동의합니다
                </label>

                <label className="agreeBtn">
                    <input type="radio" name="agree" value="disagree" />
                    동의하지 않습니다
                </label>
                <button className="gotoBtn" type="submit" role="button">
                    1:1 문의하기
                </button>
            </form>
        </section>
    )
}

export default ContactForm;