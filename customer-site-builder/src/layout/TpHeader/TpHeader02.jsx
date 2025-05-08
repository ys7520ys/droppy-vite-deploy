// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import ReactDOM from "react-dom";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable
// } from "react-beautiful-dnd";

// const EditModal = ({ editTarget, setEditTarget, pages, onSave, onClose }) => {
//   if (!editTarget) return null;

//   return ReactDOM.createPortal(
//     <div style={{
//       position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
//       background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
//       alignItems: "center", zIndex: 99999
//     }}>
//       <div style={{ background: "white", padding: 30, borderRadius: 10, width: "300px" }}>
//         <h2>메뉴 수정</h2>
//         <label>
//           이름:<br />
//           <input
//             value={editTarget.label}
//             onChange={(e) => setEditTarget({ ...editTarget, label: e.target.value })}
//             style={{ width: "100%", marginBottom: 10 }}
//           />
//         </label>
//         <label>
//           페이지 링크:<br />
//           <select
//             value={editTarget.link}
//             onChange={(e) => setEditTarget({ ...editTarget, link: e.target.value })}
//             style={{ width: "100%", marginBottom: 20 }}
//           >
//             <option value="">선택하세요</option>
//             {pages.map((_, idx) => (
//               <option key={idx} value={`/preview?page=${idx}`}>
//                 페이지 {idx + 1}
//               </option>
//             ))}
//           </select>
//         </label>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <button onClick={onSave}>저장</button>
//           <button onClick={onClose}>닫기</button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// const TpHeader02 = ({
//   menuItems = [],
//   setMenuItems,
//   pages = [],
//   isPreview = false,
//   setCurrentPageIndex,
//   currentPageIndex
// }) => {
//   const [editTarget, setEditTarget] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const navigate = useNavigate();

//   const handleSaveEdit = () => {
//     const updatedItems = menuItems.map((item) =>
//       item.id === editTarget.id ? editTarget : item
//     );
//     setMenuItems(updatedItems);
//     setShowEditModal(false);
//     setEditTarget(null);
//   };

//   const handleDelete = (id) => {
//     const filtered = menuItems.filter(item => item.id !== id);
//     setMenuItems(filtered);
//   };

//   const handleAddMenu = () => {
//     const newId = Date.now();
//     const newItem = { id: newId, label: "새 메뉴", link: "/preview?page=0" };
//     const updatedItems = [...menuItems, newItem];
//     setMenuItems(updatedItems);
//     setEditTarget(newItem);
//     setShowEditModal(true);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(menuItems);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setMenuItems(reordered);
//   };

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => alert("로그아웃 되었습니다."))
//       .catch((error) => console.error("로그아웃 실패:", error));
//   };

//   return (
//     <header className="tpHeader02" style={isPreview ? {
//       background: "#222", position: "fixed", top: 0, left: 0,
//       width: "100%", zIndex: 10000
//     } : {}}>
//       <div className="tpHeader02__container">
//         <div className="tpHeader02__logo" tabIndex="0">
//           <img alt="로고 이미지" aria-label="홈페이지로 이동하기" />
//         </div>

//         <nav className="tpHeader02__nav">
//           <ul className="tpHeader02__nav-lists" style={{
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             gap: "10px",
//             alignItems: "center",
//             padding: 0,
//             margin: 0,
//             listStyle: "none"
//           }}>
//             <DragDropContext onDragEnd={handleDragEnd}>
//               <Droppable droppableId="menu" direction="horizontal">
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex", gap: "10px" }}>
//                     {(Array.isArray(menuItems) ? menuItems : []).map((item, index) => (
//                       <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//                         {(provided) => (
//                           <li className="list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <button
//                               onClick={(e) => {
//                                 if (!isPreview) {
//                                   e.preventDefault(); // 제작 페이지일 때는 이동 막기
//                                   return;
//                                 }

//                                 if (typeof setCurrentPageIndex === "function") {
//                                   const match = item.link.match(/page=(\d+)/);
//                                   if (match) {
//                                     setCurrentPageIndex(Number(match[1]));
//                                   }
//                                 } else {
//                                   navigate(item.link, { state: { pages } });
//                                 }
//                               }}
//                               style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
//                             >
//                               {item.label}
//                             </button>
//                             {!isPreview && (
//                               <>
//                                 <button onClick={() => {
//                                   setEditTarget({ ...item });
//                                   setShowEditModal(true);
//                                 }}>✏️</button>
//                                 <button onClick={() => handleDelete(item.id)}>🗑</button>
//                               </>
//                             )}
//                           </li>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             {!isPreview && (
//               <>
//                 <li><button onClick={handleAddMenu}>➕ 메뉴 추가</button></li>
//                 <li><button onClick={() => navigate("/productPage03", { state: { pages } })}>제작페이지</button></li>
//               </>
//             )}
//             <li><button onClick={() => navigate("/login")}>로그인</button></li>
//           </ul>
//         </nav>
//       </div>

//       {!isPreview && showEditModal && (
//         <EditModal
//           editTarget={editTarget}
//           setEditTarget={setEditTarget}
//           pages={pages}
//           onSave={handleSaveEdit}
//           onClose={() => {
//             setShowEditModal(false);
//             setEditTarget(null);
//           }}
//         />
//       )}
//     </header>
//   );
// };

// export default TpHeader02;























// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // ✅ 수정된 모달 컴포넌트
// const EditModal = ({ editTarget, setEditTarget, pages, onSave, onClose }) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (editTarget) setShow(true);
//   }, [editTarget]);

//   if (!editTarget) return null;

//   return ReactDOM.createPortal(
//     <div style={{
//       position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
//       background: "rgba(0,0,0,0.5)",
//       display: "flex", justifyContent: "center", alignItems: "center",
//       zIndex: 99999,
//       transition: "opacity 0.3s ease",
//       opacity: show ? 1 : 0
//     }}>
//       <div style={{
//         background: "white",
//         padding: "24px 20px",
//         borderRadius: "12px",
//         width: "300px",
//         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//         transform: show ? "translateY(0)" : "translateY(-20px)",
//         transition: "transform 0.3s ease, opacity 0.3s ease"
//       }}>
//         <h2 style={{ fontSize: "18px", marginBottom: 12 }}>메뉴 수정</h2>
//         <label style={{ fontSize: "14px" }}>
//           이름:<br />
//           <input
//             value={editTarget.label}
//             onChange={(e) => setEditTarget({ ...editTarget, label: e.target.value })}
//             style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
//           />
//         </label>
//         <label style={{ fontSize: "14px" }}>
//           페이지 링크:<br />
//           <select
//             value={editTarget.link}
//             onChange={(e) => setEditTarget({ ...editTarget, link: e.target.value })}
//             style={{ width: "100%", marginBottom: 20, padding: 8, borderRadius: 6 }}
//           >
//             <option value="">선택하세요</option>
//             {pages.map((_, idx) => (
//               <option key={idx} value={`/preview?page=${idx}`}>
//                 페이지 {idx + 1}
//               </option>
//             ))}
//           </select>
//         </label>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <button onClick={onSave} style={{ padding: "6px 12px", borderRadius: 6 }}>저장</button>
//           <button onClick={onClose} style={{ padding: "6px 12px", borderRadius: 6 }}>닫기</button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// const TpHeader02 = ({
//   menuItems = [],
//   setMenuItems,
//   pages = [],
//   isPreview = false,
//   setCurrentPageIndex,
//   currentPageIndex
// }) => {
//   const [editTarget, setEditTarget] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const navigate = useNavigate();

//   const handleSaveEdit = () => {
//     const updatedItems = menuItems.map((item) =>
//       item.id === editTarget.id ? editTarget : item
//     );
//     setMenuItems(updatedItems);
//     setShowEditModal(false);
//     setEditTarget(null);
//   };

//   const handleDelete = (id) => {
//     const filtered = menuItems.filter(item => item.id !== id);
//     setMenuItems(filtered);
//   };

//   const handleAddMenu = () => {
//     const newId = Date.now();
//     const newItem = { id: newId, label: "새 메뉴", link: "/preview?page=0" };
//     const updatedItems = [...menuItems, newItem];
//     setMenuItems(updatedItems);
//     setEditTarget(newItem);
//     setShowEditModal(true);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(menuItems);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setMenuItems(reordered);
//   };

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => alert("로그아웃 되었습니다."))
//       .catch((error) => console.error("로그아웃 실패:", error));
//   };

//   return (
//     <header className="tpHeader02" style={isPreview ? {
//       background: "#222", position: "fixed", top: 0, left: 0,
//       width: "100%", zIndex: 10000
//     } : {}}>
//       <div className="tpHeader02__container">
//         <div className="tpHeader02__logo" tabIndex="0">
//           <img alt="로고 이미지" aria-label="홈페이지로 이동하기" />
//         </div>

//         <nav className="tpHeader02__nav">
//           <ul className="tpHeader02__nav-lists" style={{
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             gap: "10px",
//             alignItems: "center",
//             padding: 0,
//             margin: 0,
//             listStyle: "none"
//           }}>
//             <DragDropContext onDragEnd={handleDragEnd}>
//               <Droppable droppableId="menu" direction="horizontal">
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex", gap: "10px" }}>
//                     {(Array.isArray(menuItems) ? menuItems : []).map((item, index) => (
//                       <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//                         {(provided) => (
//                           <li className="list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <button
//                               onClick={(e) => {
//                                 if (!isPreview) {
//                                   e.preventDefault();
//                                   setEditTarget({ ...item });
//                                   setShowEditModal(true);
//                                   return;
//                                 }

//                                 if (typeof setCurrentPageIndex === "function") {
//                                   const match = item.link.match(/page=(\d+)/);
//                                   if (match) {
//                                     setCurrentPageIndex(Number(match[1]));
//                                   }
//                                 } else {
//                                   navigate(item.link, { state: { pages } });
//                                 }
//                               }}
//                               style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
//                             >
//                               {item.label}
//                             </button>
//                             {!isPreview && (
//                               <>
//                                 {/* <button onClick={() => {
//                                   setEditTarget({ ...item });
//                                   setShowEditModal(true);
//                                 }}>✏️</button> */}
//                                 <button onClick={() => handleDelete(item.id)}>🗑</button>
//                               </>
//                             )}
//                           </li>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             {!isPreview && (
//               <>
//                 <li><button onClick={handleAddMenu}>메뉴 추가</button></li>
//                 <li><button onClick={() => navigate("/productPage03", { state: { pages } })}>제작페이지</button></li>
//               </>
//             )}
//             <li><button onClick={() => navigate("/login")}>로그인</button></li>
//           </ul>
//         </nav>
//       </div>

//       {!isPreview && showEditModal && (
//         <EditModal
//           editTarget={editTarget}
//           setEditTarget={setEditTarget}
//           pages={pages}
//           onSave={handleSaveEdit}
//           onClose={() => {
//             setShowEditModal(false);
//             setEditTarget(null);
//           }}
//         />
//       )}
//     </header>
//   );
// };

// export default TpHeader02;











// ✅ TpHeader02.jsx (수정 모달 내 삭제 기능 포함)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// ✅ 수정된 모달 컴포넌트
const EditModal = ({ editTarget, setEditTarget, pages, onSave, onClose, onDelete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (editTarget) setShow(true);
  }, [editTarget]);

  if (!editTarget) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 99999,
      transition: "opacity 0.3s ease",
      opacity: show ? 1 : 0
    }}>
      <div style={{
        background: "white",
        padding: "24px 20px",
        borderRadius: "12px",
        width: "300px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        transform: show ? "translateY(0)" : "translateY(-20px)",
        transition: "transform 0.3s ease, opacity 0.3s ease"
      }}>
        <h2 style={{ fontSize: "18px", marginBottom: 12 }}>메뉴 수정</h2>

        <label style={{ fontSize: "14px" }}>
          이름:<br />
          <input
            value={editTarget.label}
            onChange={(e) => setEditTarget({ ...editTarget, label: e.target.value })}
            style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontSize: "14px" }}>
          페이지 링크:<br />
          <select
            value={editTarget.link}
            onChange={(e) => setEditTarget({ ...editTarget, link: e.target.value })}
            style={{ width: "100%", marginBottom: 20, padding: 8, borderRadius: 6 }}
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
          <button onClick={onSave} style={{ padding: "6px 12px", borderRadius: 6 }}>저장</button>
          <button onClick={onClose} style={{ padding: "6px 12px", borderRadius: 6 }}>닫기</button>
        </div>

        {/* ✅ 삭제 버튼 추가 */}
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                onDelete(editTarget.id);
                onClose();
              }
            }}
            style={{
              color: "red",
              fontSize: "13px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const TpHeader02 = ({
  menuItems = [],
  setMenuItems,
  pages = [],
  isPreview = false,
  setCurrentPageIndex,
  currentPageIndex
}) => {
  const [editTarget, setEditTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => alert("로그아웃 되었습니다."))
      .catch((error) => console.error("로그아웃 실패:", error));
  };

  return (
    <header className="tpHeader02" style={isPreview ? {
      background: "#222", position: "fixed", top: 0, left: 0,
      width: "100%", zIndex: 10000
    } : {}}>
      <div className="tpHeader02__container"
        style={{
          height:"100px",
          border:"solid 1px red"
        }}
      >
        <div className="tpHeader02__logo" tabIndex="0">
          <img alt="로고 이미지" aria-label="홈페이지로 이동하기" />
        </div>

        <nav className="tpHeader02__nav">
          <ul className="tpHeader02__nav-lists" style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            padding: 0,
            margin: 0,
            listStyle: "none",
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
                              onClick={(e) => {
                                if (!isPreview) {
                                  e.preventDefault();
                                  setEditTarget({ ...item });
                                  setShowEditModal(true);
                                  return;
                                }

                                if (typeof setCurrentPageIndex === "function") {
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
                            {/* {!isPreview && (
                              // <button onClick={() => handleDelete(item.id)}>🗑</button>
                            )} */}
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
                <li>
                  <button 
                    onClick={handleAddMenu}
                    style={{
                      padding:10
                    }}
                  >
                    메뉴 추가
                  </button>
                </li>
                <li><button onClick={() => navigate("/productPage03", { state: { pages } })}>제작페이지</button></li>
              </>
            )}
            <li><button onClick={() => navigate("/login")}>로그인</button></li>
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
          onDelete={handleDelete} // ✅ 삭제 기능 연결
        />
      )}
    </header>
  );
};

export default TpHeader02;
