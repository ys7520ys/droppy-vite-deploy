import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import {
	DragDropContext,
	Droppable,
	Draggable
} from "react-beautiful-dnd";
// import logoImg from "../assets/img/logo.png";

const defaultNavItems = [
	{ label: "식사의 가치", link: "/about" },
	{ label: "브랜드 스토리", link: "/asset" },
	{ label: "고객의 신뢰", link: "/news" },
	{ label: "자주 묻는 질문", link: "/contactUs" },
	{ label: "새 메뉴", link: "/new" },
];

const EditModal = ({ editTarget, setEditTarget, pages, onSave, onClose }) => {
	if (!editTarget) return null;
	return ReactDOM.createPortal(
		<div style={{
			position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
			background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
			alignItems: "center", zIndex: 99999
		}}>
			<div style={{
				background: "white", padding: 30, borderRadius: 10, width: "300px"
			}}>
				<h2>메뉴 수정</h2>
				<label>
					이름:<br />
					<input
						value={editTarget.label}
						onChange={(e) => setEditTarget({ ...editTarget, label: e.target.value })}
						style={{ width: "100%", marginBottom: 10 }}
					/>
				</label>
				<label>
					페이지 링크:<br />
					<select
						value={editTarget.link}
						onChange={(e) => setEditTarget({ ...editTarget, link: e.target.value })}
						style={{ width: "100%", marginBottom: 20 }}
					>
						<option value="">선택하세요</option>
						{pages.map((_, idx) => (
							<option key={idx} value={`/preview?page=${idx}`}>
								페이지 {idx + 1}
							</option>
						))}
					</select>
				</label>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<button onClick={onSave}>저장</button>
					<button onClick={onClose}>닫기</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

const TpHeader03 = ({ menuItems = [], setMenuItems, pages = [], isPreview = false, setCurrentPageIndex, currentPageIndex }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const openBtnRef = useRef(null);
	const closeBtnRef = useRef(null);
	const [editTarget, setEditTarget] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if(menuOpen) {
			closeBtnRef.current?.focus();
		}else {	
			openBtnRef.current?.focus();
		}
	},[menuOpen]);

	const handleSaveEdit = () => {
		const updatedItems = menuItems.map((item) =>
			item.id === editTarget.id ? editTarget : item
		);
		setMenuItems(updatedItems);
		setShowEditModal(false);
		setEditTarget(null);
	};

	const handleDelete = (id) => {
		const filtered = menuItems.filter(item => item.id !== id);
		setMenuItems(filtered);
	};

	const handleAddMenu = () => {
		const newId = Date.now();
		const newItem = { id: newId, label: "새 메뉴", link: "/preview?page=0" };
		const updatedItems = [...menuItems, newItem];
		setMenuItems(updatedItems);
		setEditTarget(newItem);
		setShowEditModal(true);
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const reordered = Array.from(menuItems);
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);
		setMenuItems(reordered);
	};

	return (
		<header role="banner" className="tpHeader03" style={isPreview ? {
			background: "#222", position: "fixed", top: 0, left: 0,
			width: "100%", zIndex: 10000
		} : {}}>
			<div className="tpHeader03__container">
				<Link 
					to="/" 
					className="tpHeader03__logo" 
					tabIndex="0" 
				>
					<img 
						// src={logoImg} 
						alt="CJENM 로고 이미지" 
						aria-label="홈페이지로 이동하기" 
						// 원래 title의 값도 aria-label과 동일하게 구성하였지만 반복적인 내용으로 인해서 제외함
					/>
				</Link>
				<nav className="tpHeader03__nav" role="navigation">
					<ul className="tpHeader03__nav-lists" style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "10px",
						alignItems: "center",
						padding: 0,
						margin: 0,
						listStyle: "none"
					}}>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId="menu" direction="horizontal">
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex", gap: "10px" }}>
										{(Array.isArray(menuItems) ? menuItems : []).map((item, index) => (
											<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
												{(provided) => (
													<li className="list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
														<button
															onClick={() => {
																if (isPreview && typeof setCurrentPageIndex === "function") {
																	const match = item.link.match(/page=(\d+)/);
																	if (match) {
																		setCurrentPageIndex(Number(match[1]));
																	}
																} else {
																	navigate(item.link, { state: { pages } });
																}
															}}
															style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
														>
															{item.label}
														</button>
														{!isPreview && (
															<>
																<button onClick={() => {
																	setEditTarget({ ...item });
																	setShowEditModal(true);
																}}>✏️</button>
																<button onClick={() => handleDelete(item.id)}>🗑</button>
															</>
														)}
													</li>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
						{!isPreview && (
							<>
								<li><button onClick={handleAddMenu}>➕ 메뉴 추가</button></li>
								<li><button onClick={() => navigate("/productPage03", { state: { pages } })}>제작페이지</button></li>
							</>
						)}
						<li>
							<button onClick={() => navigate("/login")}>로그인</button>
						</li>
					</ul>
				</nav>
				<button 
					aria-expanded={menuOpen} 
					aria-controls="sideMenu" 
					aria-label="카테고리 메뉴 닫힘, 메뉴 열기"
					className="tpHeader03__menuBtn" 
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
					className={`tpHeader03__sideMenu ${menuOpen ? "active" : ""}`} 
					id="sideMenu" 
					aria-hidden={!menuOpen}
				>
					<button 
						className="tpHeader03__sideMenu-closeBtn" 
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
			{!isPreview && showEditModal && (
				<EditModal
					editTarget={editTarget}
					setEditTarget={setEditTarget}
					pages={pages}
					onSave={handleSaveEdit}
					onClose={() => {
						setShowEditModal(false);
						setEditTarget(null);
					}}
				/>
			)}
		</header>
	)
}

export default TpHeader03;