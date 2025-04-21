import React from "react";

const Footer = () => {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer__title">
                <div className="footer__title-text">
                    HOME
                </div>
            </div>
            <div className="footer__info">
                <div className="footer__info-container">
                    <nav className="footer__nav">
                        <ul className="footer__nav-lists">
                            <li className="list">
                                <a href="#none" className="list-link">개인정보처리방침</a>
                            </li>
                            <li className="list">
                                <a href="#none" className="list-link">법적고지</a>
                            </li>
                            <li className="list">
                                <a href="#none" className="list-link">이메일무단수집거부</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="footer__language">
                        <label for="options" className="footer__language-label"></label>
                        <select name="" id="options" className="footer__language-select">
                            <option value="option1">KO</option>
                            <option value="option2">EN</option>
                            <option value="option3">JP</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="footer__details">
                <div className="footer__details-box">
                    <p className="text">
                        (주)씨제이엔엠 대표이사 : 윤상현 |
                        <a href="#none" className="text-link">
                            <u>사업자정보확인</u>
                        </a>
                    </p>
                    <p className="text">
                        (03926) 서울시 마포구 상암산로 66 | 사업자 등록번호 : 106-81-51510 | 개인정보 보호책임자 : 김지훈
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;