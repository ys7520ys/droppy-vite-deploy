import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../assets/img/logo.png";

const TpHeader01 = () => {
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
						<li className="list">
							<Link 
								to="/about" 
								className="list-link" 
								aria-label="ABOUT US 페이지로 이동" 
							>
								네비1
							</Link>
						</li>
						<li className="list">
							<Link 
								to="/asset" 
								className="list-link" 
								aria-label="ASSET 페이지로 이동" 
							>
								네비2
							</Link>
						</li>
						<li className="list">
							<Link 
								to="/news" 
								className="list-link" 
								aria-label="NEWS 페이지로 이동" 
							>
								네비3
							</Link>
						</li>
						<li className="list">
							<Link 
								to="/contactUs" 
								className="list-link" 
								aria-label="CONTACT US 페이지로 이동" 
							>
								네비4
							</Link>
						</li>
					</ul>
				</nav>
				<button 
					aria-expanded={menuOpen} 
					aria-controls="sideMenu" 
					aria-label="카테고리 메뉴 닫힘, 메뉴 열기"
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
				<nav 
					className={`tpHeader01__sideMenu ${menuOpen ? "active" : ""}`} 
					id="sideMenu" 
					aria-hidden={!menuOpen}
				>
					<button 
						className="tpHeader01__sideMenu-closeBtn" 
						aria-label="카테고리 메뉴 열림, 메뉴 닫기" 
						tabIndex={menuOpen ? "0" : "-1"} 
						onClick={() => { setMenuOpen(!menuOpen) }}
						ref={closeBtnRef}
					>
						X
					</button>
					<ul className="sideMenu__lists" aria-hidden={!menuOpen}>
						<li className="sideMenu__lists-list">
							<Link 
								to="/about" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ABOUT 페이지로 이동"
							>
								네비1
							</Link>
						</li>
						<li className="sideMenu__lists-list">
							<Link 
								to="/asset" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ASSET 페이지로 이동"
							>
								네비2
							</Link>
						</li>
						<li className="sideMenu__lists-list">
							<Link 
								to="/news" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="NEWS 페이지로 이동"
							>
								네비3
							</Link>
						</li>
						<li className="sideMenu__lists-list">
							<Link 
								to="/contactUs" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="CONTACTUS 페이지로 이동"
							>
								네비4
							</Link>
						</li>
					</ul>
				</nav>

			</div>
		</header>
	)
}

export default TpHeader01;