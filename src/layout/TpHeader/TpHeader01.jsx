import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../assets/img/logo.png";

const TpHeader01 = ({ navItems = [], ...props }) => {
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
		<header role="banner" className="tpHeader01">
			<div className="tpHeader01__container">
				<Link 
					to="/" 
					className="tpHeader01__logo" 
					tabIndex="0" 
				>
					<img 
						// src={logoImg} 
						alt="CJENM 로고 이미지" 
						aria-label="홈페이지로 이동하기" 
						// 원래 title의 값도 aria-label과 동일하게 구성하였지만 반복적인 내용으로 인해서 제외함
					/>
				</Link>
				<nav className="tpHeader01__nav" role="navigation">
					<ul className="tpHeader01__nav-lists">
						{navItems.map((item, idx) => (
							<li className="list" key={idx}>
								<Link 
									to={item.link}
									className="list-link"
									aria-label={item.label + " 페이지로 이동"}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<button 
					aria-expanded={menuOpen} 
					aria-controls="sideMenu" 
					aria-label="컴포넌트 메뉴 열기"
					className="tpHeader01__menuBtn" 
					ref={openBtnRef}
					onClick={() => { setMenuOpen(!menuOpen) }}
				>
					<ul>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</button>
				<button
					className="tpHeader01__loginBtn"
					aria-label="로그인"
					onClick={() => { /* 로그인 동작 추가 */ }}
				>
					로그인
				</button>
				<nav 
					className={`tpHeader01__sideMenu ${menuOpen ? "active" : ""}`} 
					id="sideMenu" 
					aria-hidden={!menuOpen}
				>
					<button 
						className="tpHeader01__sideMenu-closeBtn" 
						aria-label="컴포넌트 메뉴 닫기" 
						tabIndex={menuOpen ? "0" : "-1"} 
						onClick={() => { setMenuOpen(!menuOpen) }}
						ref={closeBtnRef}
					>
						X
					</button>
					<ul className="sideMenu__lists" aria-hidden={!menuOpen}>
						<li className="sideMenu__lists-list">
							<span>컴포넌트A</span>
						</li>
						<li className="sideMenu__lists-list">
							<span>컴포넌트B</span>
						</li>
						<li className="sideMenu__lists-list">
							<span>컴포넌트C</span>
						</li>
						{/* 실제 컴포넌트 리스트로 교체 가능 */}
					</ul>
				</nav>

			</div>
		</header>
	)
}

export default TpHeader01;