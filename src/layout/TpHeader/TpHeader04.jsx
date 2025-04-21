import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../assets/img/logo.png";

const TpHeader04 = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);
    useEffect(() => {
        if(menuOpen) {
            closeBtnRef.current?.focus();
        }else {	
            openBtnRef.current?.focus();
        }
    },[menuOpen]);

    return (
        <header role="banner" className="tpHeader04">
            <div className="tpHeader04__container">
                <Link 
                    to="/" 
                    className="tpHeader04__logo" 
                    tabIndex="0" 
                >
                    <img 
                        // src={logoImg} 
                        alt="CJENM 로고 이미지" 
                        aria-label="홈페이지로 이동하기" 
                        // 원래 title의 값도 aria-label과 동일하게 구성하였지만 반복적인 내용으로 인해서 제외함
                    />
                </Link>
                <Link
                    to=""
                    className="tpHeader04__btn"
                    tabIndex="0" 
                >
                    지원하기
                </Link>
            </div>
        </header>
    )
}

export default TpHeader04;