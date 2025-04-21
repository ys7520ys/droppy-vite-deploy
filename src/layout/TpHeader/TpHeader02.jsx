import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

// import logoImg from "../assets/img/logo.png";

const TpHeader02 = ({user}) => {
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
	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
		  .then(() => {
			alert("로그아웃 되었습니다.");
			// 자동으로 App.js에서 상태 갱신됨
		  })
		  .catch((error) => {
			console.error("로그아웃 실패:", error);
		  });
	};
	return (
		<header role="banner" className="tpHeader02">
			<div className="tpHeader02__container">
				<Link 
					to="/" 
					className="tpHeader02__logo" 
					tabIndex="0" 
				>
					<img 
						// src={logoImg} 
						alt="CJENM 로고 이미지" 
						aria-label="홈페이지로 이동하기" 
						// 원래 title의 값도 aria-label과 동일하게 구성하였지만 반복적인 내용으로 인해서 제외함
					/>
				</Link>
				<nav className="tpHeader02__nav" role="navigation">
					<ul className="tpHeader02__nav-lists">
						<li className="list">
							{/* <Link 
								to="/about" 
								className="list-link" 
								aria-label="ABOUT US 페이지로 이동" 
							>
								브랜드 소개
							</Link> */}
							<a href="#part1">
								식사의 가치
							</a>
						</li>
						<li className="list">
							{/* <Link 
								to="/asset" 
								className="list-link" 
								aria-label="ASSET 페이지로 이동" 
							>
								메뉴 구성
							</Link> */}
							<a href="#part2">
								브랜드 스토리
							</a>
						</li>
						<li className="list">
							{/* <Link 
								to="/news" 
								className="list-link" 
								aria-label="NEWS 페이지로 이동" 
							>
								이용 방법
							</Link> */}
							<a href="#part3">
								고객의 신뢰
							</a>
						</li>
						<li className="list">
							{/* <Link 
								to="/contactUs" 
								className="list-link" 
								aria-label="CONTACT US 페이지로 이동" 
							>
								후기
							</Link> */}
							<a href="#part4">
								자주 묻는 질문
							</a>
						</li>
						{/* {user ? (
							<button onClick={handleLogout} style={{ background: "#000", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "6px" }}>
							로그아웃
							</button>
						) : null}
						<Link to="/login">
							로그인
						</Link> */}
						<Link to="/productPage03">
							제작페이지
						</Link>
						{user ? (
						<Link
							to="/"	
							onClick={handleLogout}
						>
							로그아웃
						</Link>
						) : (
						<Link to="/login">
							로그인
						</Link>
						)}
					</ul>

				</nav>
				<button 
					aria-expanded={menuOpen} 
					aria-controls="sideMenu" 
					aria-label="카테고리 메뉴 닫힘, 메뉴 열기"
					className="tpHeader02__menuBtn" 
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
					className={`tpHeader02__sideMenu ${menuOpen ? "active" : ""}`} 
					id="sideMenu" 
					aria-hidden={!menuOpen}
				>
					<button 
						className="tpHeader02__sideMenu-closeBtn" 
						aria-label="카테고리 메뉴 열림, 메뉴 닫기" 
						tabIndex={menuOpen ? "0" : "-1"} 
						onClick={() => { setMenuOpen(!menuOpen) }}
						ref={closeBtnRef}
					>
						X
					</button>
					<ul className="sideMenu__lists" aria-hidden={!menuOpen}>
						<li className="sideMenu__lists-list">
							{/* <Link 
								to="/about" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ABOUT 페이지로 이동"
							>
								네비1
							</Link> */}
							<a	
								href="#part1"
								// to="/about" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ABOUT 페이지로 이동"
							>
								네비1
							</a>
						</li>
						<li className="sideMenu__lists-list">
							{/* <Link 
								to="/asset" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ASSET 페이지로 이동"
							>
								네비2
							</Link> */}
							<a 
								href="#part2"
								// to="/asset"
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="ASSET 페이지로 이동"
							>
								네비2
							</a>
						</li>
						<li className="sideMenu__lists-list">
							{/* <Link 
								to="/news" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="NEWS 페이지로 이동"
							>
								네비3
							</Link> */}
							<a
								href="#part3"
								// to="/news" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="NEWS 페이지로 이동"
							>
								네비3
							</a>
						</li>
						<li className="sideMenu__lists-list">
							{/* <Link 
								to="/contactUs" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="CONTACTUS 페이지로 이동"
							>
								네비4
							</Link> */}
							<a 
								href="#part4"
								// to="/news" 
								tabIndex={menuOpen ? "0" : "-1"} 
								onClick={() => { setMenuOpen(!menuOpen) }}
								aria-label="NEWS 페이지로 이동"
							>
								네비3
							</a>
						</li>
					</ul>
				</nav>

			</div>
		</header>
	)
}

export default TpHeader02;