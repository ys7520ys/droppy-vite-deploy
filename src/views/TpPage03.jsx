// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// // 컴포넌트 매핑 테이블
// const componentMap = {
//   text: <TpBanner04 />,
//   text2: <Tpsection02 />,
//   button: <Tpsection04 />,
//   button2: <Tpsection07 />,
// };

// // HTML 문자열로 변환 (간단한 예시 버전)
// const componentToHTML = (type) => {
//   switch (type) {
//     case "text":
//       return `<section><h2>텍스트 영역입니다</h2></section>`;
//     case "button":
//       return `<section><button>버튼입니다</button></section>`;
//     case "button2":
//       return `<section><div>고객 만족도 차트</div></section>`;
//     case "text2":
//       return `<section><p>텍스트2 내용</p></section>`;
//     default:
//       return "";
//   }
// };

// // 드래그 아이템
// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({
//     type: "COMPONENT",
//     item: { type },
//   }));

//   return (
//     <div
//       ref={dragRef}
//       style={{
//         background: "#eee",
//         padding: "8px",
//         marginBottom: "8px",
//         cursor: "grab",
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// // 드롭영역 + 출력
// const DropCanvas = ({ onDrop, components, onDelete }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     }));

//     return (
//       <div
//         ref={dropRef}
//         style={{
//           height: "40px",
//           backgroundColor: isOver ? "#fff" : "transparent",
//           border: "2px dashed #fff",
//           margin: "10px 0",
//           transition: "background-color 0.3s",
//         }}
//       />
//     );
//   };

//   return (
//     <div
//       id="drop-area"
//       style={{
//         flex: 1,
//         backgroundColor: "#222222",
//         border: "2px dashed #ccc",
//         minHeight: "400px",
//         padding: "0px 20px",
//       }}
//     >
//       {components.length === 0 ? (
//         <DropZone index={0} />
//       ) : (
//         components.map((c, i) => (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div
//               style={{
//                 position: "relative",
//                 marginBottom: "20px",
//                 border: "2px dashed white",
//               }}
//             >
//               {componentMap[c.type]}
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   backgroundColor: "#ff4d4f",
//                   color: "#fff",
//                   border: "none",
//                   padding: "12px 25px",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   zIndex: "1000",
//                   fontSize: "20px",
//                   fontWeight: "600",
//                 }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         ))
//       )}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// // 메인 페이지
// const TpPage03 = () => {
//   const [droppedComponents, setDroppedComponents] = useState([]);

//   const handleDrop = (item, index) => {
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, item);
//       return newComponents;
//     });
//   };

//   const handleDelete = (indexToRemove) => {
//     setDroppedComponents((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents
//       .map((comp) => componentToHTML(comp.type))
//       .join("\n");

//     const fullHTML = `
//       <!DOCTYPE html>
//       <html lang="ko">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>완성된 페이지</title>
//         <style>
//           body { font-family: sans-serif; padding: 40px; background: #f9f9f9; }
//           section { padding: 30px; margin-bottom: 20px; border: 1px solid #ddd; background: white; }
//         </style>
//       </head>
//       <body>
//         ${htmlBody}
//       </body>
//       </html>
//     `;

//     const preview = window.open();
//     preview.document.write(fullHTML);
//     preview.document.close();
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div
//         style={{
//           backgroundColor: "#222222",
//           padding: "300px 0px",
//           width: "100%",
//         }}
//       >
//         {/* 사이드 고정 메뉴 */}
//         <div
//           style={{
//             zIndex: "1000",
//             width: "200px",
//             margin: "0 auto",
//             color: "#fff",
//             position: "fixed",
//             top: "100px",
//             right: "100px",
//           }}
//         >
//           <h4 style={{ marginBottom: "16px" }}>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="text" label="텍스트" />
//           <ComponentItem type="button" label="버튼" />
//           <ComponentItem type="button2" label="버튼2" />
//           <ComponentItem type="text2" label="텍스트2" />
//           <button
//             onClick={handleBuild}
//             style={{
//               marginTop: "20px",
//               width: "100%",
//               padding: "12px 10px",
//               backgroundColor: "#4caf50",
//               color: "#fff",
//               fontSize: "16px",
//               fontWeight: "bold",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             ✅ 완성하기
//           </button>
//         </div>

//         {/* 드래그 Drop 영역 */}
//         <DropCanvas
//           onDrop={handleDrop}
//           components={droppedComponents}
//           onDelete={handleDelete}
//         />
//       </div>
//     </DndProvider>
//   );
// };

// export default TpPage03;














// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// // 💡 HTML 변환 함수 (판매용 정적 HTML용)
// const componentToHTML = (type) => {
//   switch (type) {
//     case "text":
//       return `<section><h2 style="font-size:32px;">Hero 텍스트입니다</h2></section>`;
//     case "text2":
//       return `<section><p style="font-size:20px;">서브 텍스트입니다</p></section>`;
//     case "button":
//       return `<section><button style="background:#333;color:#fff;padding:10px 20px;">버튼입니다</button></section>`;
//     case "button2":
//       return `<section><div style="font-size:24px;">고객 만족도 차트 (디자인 요소)</div></section>`;
//     default:
//       return "";
//   }
// };

// // 컴포넌트 매핑 테이블 (React 내부 렌더링용)
// const componentMap = {
//   text: <TpBanner04 />,
//   text2: <Tpsection02 />,
//   button: <Tpsection04 />,
//   button2: <Tpsection07 />,
// };

// // 드래그 컴포넌트 항목
// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({
//     type: "COMPONENT",
//     item: { type },
//   }));

//   return (
//     <div
//       ref={dragRef}
//       style={{
//         background: "#eee",
//         padding: "8px",
//         marginBottom: "8px",
//         cursor: "grab",
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// // 드롭 영역 + 사이에 삽입 가능한 DropZone 포함
// const DropCanvas = ({ onDrop, components, onDelete }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     }));

//     return (
//       <div
//         ref={dropRef}
//         style={{
//           height: "40px",
//           backgroundColor: isOver ? "#fff" : "transparent",
//           border: "2px dashed #fff",
//           margin: "10px 0",
//           transition: "background-color 0.3s",
//         }}
//       />
//     );
//   };

//   return (
//     <div
//       id="drop-area"
//       style={{
//         flex: 1,
//         backgroundColor: "#222222",
//         border: "2px dashed #ccc",
//         minHeight: "400px",
//         padding: "0px 20px",
//       }}
//     >
//       {components.length === 0 ? (
//         <DropZone index={0} />
//       ) : (
//         components.map((c, i) => (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div
//               style={{
//                 position: "relative",
//                 marginBottom: "20px",
//                 border: "2px dashed white",
//               }}
//             >
//               {componentMap[c.type]}
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   backgroundColor: "#ff4d4f",
//                   color: "#fff",
//                   border: "none",
//                   padding: "12px 25px",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   zIndex: "1000",
//                   fontSize: "20px",
//                   fontWeight: "600",
//                 }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         ))
//       )}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// // 메인 페이지
// const TpPage03 = () => {
//   const [droppedComponents, setDroppedComponents] = useState([]);

//   const handleDrop = (item, index) => {
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, item);
//       return newComponents;
//     });
//   };

//   const handleDelete = (indexToRemove) => {
//     setDroppedComponents((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents
//       .map((comp) => componentToHTML(comp.type))
//       .join("\n");

//     const fullHTML = `
//       <!DOCTYPE html>
//       <html lang="ko">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>완성된 페이지</title>
//         <style>
//           body { font-family: sans-serif; padding: 40px; background: #f9f9f9; }
//           section { padding: 30px; margin-bottom: 20px; border: 1px solid #ddd; background: white; }
//           button { padding: 10px 20px; background: #4caf50; color: white; border: none; }
//         </style>
//       </head>
//       <body>
//         ${htmlBody}
//       </body>
//       </html>
//     `;

//     const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "my-template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div
//         style={{
//           backgroundColor: "#222222",
//           padding: "300px 0px",
//           width: "100%",
//         }}
//       >
//         {/* 우측 고정된 컴포넌트 목록 */}
//         <div
//           style={{
//             zIndex: "1000",
//             width: "200px",
//             color: "#fff",
//             position: "fixed",
//             top: "100px",
//             right: "100px",
//           }}
//         >
//           <h4 style={{ marginBottom: "16px" }}>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="text" label="텍스트" />
//           <ComponentItem type="button" label="버튼" />
//           <ComponentItem type="button2" label="버튼2" />
//           <ComponentItem type="text2" label="텍스트2" />
//           <button
//             onClick={handleBuild}
//             style={{
//               marginTop: "20px",
//               width: "100%",
//               padding: "12px 10px",
//               backgroundColor: "#4caf50",
//               color: "#fff",
//               fontSize: "16px",
//               fontWeight: "bold",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             ✅ 완성하기 (HTML 다운로드)
//           </button>
//         </div>

//         {/* 컴포넌트 드롭 영역 */}
//         <DropCanvas
//           onDrop={handleDrop}
//           components={droppedComponents}
//           onDelete={handleDelete}
//         />
//       </div>
//     </DndProvider>
//   );
// };

// export default TpPage03;


// 🔥 Firestore 저장 기능 추가된 TpPage03
// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";
// import { db } from "../firebase"; // ✅ firebase.js에서 db 불러오기
// import { collection, addDoc } from "firebase/firestore";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// const componentToHTML = (type) => {
//   switch (type) {
//     case "배너04":
//       return `<section><h2 style="font-size:32px;">Hero 텍스트입니다</h2></section>`;
//     case "섹션02":
//       return `<section><p style="font-size:20px;">서브 텍스트입니다</p></section>`;
//     case "섹션04":
//       return `<section><button style="background:#333;color:#fff;padding:10px 20px;">버튼입니다</button></section>`;
//     case "섹션07":
//       return `<section><div style="font-size:24px;">고객 만족도 차트 (디자인 요소)</div></section>`;
//     default:
//       return "";
//   }
// };

// const componentMap = {
//   배너04: <TpBanner04 />, 섹션02: <Tpsection02 />, 섹션04: <Tpsection04 />, 섹션07: <Tpsection07 />,
// };

// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
//   return <div ref={dragRef} style={{ background: "#eee", padding: "8px", marginBottom: "8px", cursor: "grab" }}>{label}</div>;
// };

// const DropCanvas = ({ onDrop, components, onDelete }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }));

//     return <div ref={dropRef} style={{ height: "40px", backgroundColor: isOver ? "#fff" : "transparent", border: "2px dashed #fff", margin: "10px 0" }} />;
//   };

//   return (
//     <div id="drop-area" style={{ flex: 1, backgroundColor: "#222222", border: "2px dashed #ccc", minHeight: "400px", padding: "0px 20px" }}>
//       {components.length === 0 ? <DropZone index={0} /> : components.map((c, i) => (
//         <React.Fragment key={i}>
//           <DropZone index={i} />
//           <div style={{ position: "relative", marginBottom: "20px", border: "2px dashed white" }}>
//             {componentMap[c.type]}
//             <button onClick={() => onDelete(i)} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#ff4d4f", color: "#fff", border: "none", padding: "12px 25px", borderRadius: "4px", cursor: "pointer", zIndex: "1000", fontSize: "20px", fontWeight: "600" }}>삭제</button>
//           </div>
//         </React.Fragment>
//       ))}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// const TpPage03 = () => {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const handleDrop = (item, index) => {
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, item);
//       return newComponents;
//     });
//   };

//   const handleDelete = (indexToRemove) => {
//     setDroppedComponents((prev) => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSubmitOrder = async () => {
//     if (!email || !name) {
//       alert("이름과 이메일을 입력해주세요.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "orders"), {
//         user: { name, email },
//         components: droppedComponents
//       });
//       alert("주문이 성공적으로 저장되었습니다!");
//     } catch (error) {
//       console.error("저장 실패:", error);
//       alert("문제가 발생했습니다. 다시 시도해주세요.");
//     }
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents.map((comp) => componentToHTML(comp.type)).join("\n");
//     const fullHTML = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>완성된 페이지</title><style>body{font-family:sans-serif;padding:40px;background:#f9f9f9;}section{padding:30px;margin-bottom:20px;border:1px solid #ddd;background:white;}button{padding:10px 20px;background:#4caf50;color:white;border:none;}</style></head><body>${htmlBody}</body></html>`;
//     const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "my-template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ backgroundColor: "#222222", padding: "300px 0px", width: "100%" }}>
//         <div style={{ zIndex: "1000", width: "240px", color: "black", position: "fixed", top: "100px", right: "100px" }}>
//           <h4 style={{ marginBottom: "16px" }}>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="배너04" label="(배너04)"/>
//           <ComponentItem type="섹션02" label="(섹션02)" />
//           <ComponentItem type="섹션04" label="(섹션04)" />
//           <ComponentItem type="섹션07" label="(섹션07)" />

//           <div style={{ marginTop: "20px" }}>
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" style={{ width: "100%", padding: "8px" }} />
//           </div>

//           <button onClick={handleSubmitOrder} style={{ marginTop: "10px", width: "100%", padding: "12px 10px", backgroundColor: "#2196f3", color: "#fff", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>📤 주문하기 (Firestore 저장)</button>

//           <button onClick={handleBuild} style={{ marginTop: "10px", width: "100%", padding: "12px 10px", backgroundColor: "#4caf50", color: "#fff", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>✅ HTML 다운로드</button>
//         </div>

//         <DropCanvas onDrop={handleDrop} components={droppedComponents} onDelete={handleDelete} />
//       </div>
//     </DndProvider>
//   );
// };

// export default TpPage03;








// // ✅ TpPage03 전체 코드: 컴포넌트 클릭 시 수정 가능 + 수정 내용 Firestore 저장
// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// const componentToHTML = (comp) => {
//   const text = comp.text || "텍스트입니다";
//   const imgTag = comp.img ? `<img src='${comp.img}' alt='' />` : "";

//   switch (comp.type) {
//     case "배너04":
//       return `<section><h2>${text}</h2>${imgTag}</section>`;
//     case "섹션02":
//       return `<section><p>${text}</p>${imgTag}</section>`;
//     case "섹션04":
//       return `<section><button>${text}</button>${imgTag}</section>`;
//     case "섹션07":
//       return `<section><div>${text}</div>${imgTag}</section>`;
//     default:
//       return "";
//   }
// };

// const componentMap = {
//   배너04: TpBanner04,
//   섹션02: Tpsection02,
//   섹션04: Tpsection04,
//   섹션07: Tpsection07,
// };

// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
//   return <div ref={dragRef} style={{ background: "#eee", padding: 8, marginBottom: 8 }}>{label}</div>;
// };

// const DropCanvas = ({ components, onDrop, onDelete, onEdit }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }));
//     return <div ref={dropRef} style={{ height: 40, border: "2px dashed #fff", margin: "10px 0", background: isOver ? "#444" : "transparent" }} />;
//   };

//   return (
//     <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400 }}>
//       {components.map((comp, i) => {
//         const Comp = componentMap[comp.type];
//         return (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
//               <Comp
//                 text={comp.text}
//                 img={comp.img}
//                 onEdit={(newData) => onEdit(i, newData)}
//               />
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{ position: "absolute", top: 10, right: 10, background: "#f33", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         );
//       })}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// function TpPage03() {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const handleDrop = (item, index) => {
//     const newItem = { ...item, text: "", img: "" }; // 기본값 설정
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, newItem);
//       return newComponents;
//     });
//   };

//   const handleEdit = (index, newData) => {
//     setDroppedComponents((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, ...newData } : c))
//     );
//   };

//   const handleDelete = (index) => {
//     setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmitOrder = async () => {
//     if (!email || !name) return alert("이름과 이메일을 입력해주세요.");
//     try {
//       await addDoc(collection(db, "orders"), {
//         user: { name, email },
//         components: droppedComponents,
//       });
//       alert("주문이 저장되었습니다!");
//     } catch (err) {
//       alert("저장 실패: " + err.message);
//     }
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents.map((c) => componentToHTML(c)).join("\n");
//     const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
//     const blob = new Blob([html], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ padding: "200px 0", background: "#222" }}>
//         <div style={{ width: 240, position: "fixed", top: 100, right: 100, background: "#f4f4f4", padding: 20 }}>
//           <h4>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="배너04" label="배너04" />
//           <ComponentItem type="섹션02" label="섹션02" />
//           <ComponentItem type="섹션04" label="섹션04" />
//           <ComponentItem type="섹션07" label="섹션07" />

//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{ width: "100%", marginTop: 20 }} />
//           <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{ width: "100%", marginTop: 10 }} />

//           <button onClick={handleSubmitOrder} style={{ marginTop: 16, width: "100%" }}>📤 Firestore 저장</button>
//           <button onClick={handleBuild} style={{ marginTop: 8, width: "100%" }}>💾 HTML 다운로드</button>
//         </div>

//         <DropCanvas
//           components={droppedComponents}
//           onDrop={handleDrop}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       </div>
//     </DndProvider>
//   );
// }

// export default TpPage03;
// TpPage03.jsx - 컴포넌트 드래그, 수정 및 Firestore 저장 전체 구현


















// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// const componentToHTML = (comp) => {
//   const text = comp.text || "텍스트입니다";
//   const imgTag = comp.img ? `<img src='${comp.img}' alt='' />` : "";

//   switch (comp.type) {
//     case "배너04": return `<section><h2>${text}</h2>${imgTag}</section>`;
//     case "섹션02": return `<section><p>${text}</p>${imgTag}</section>`;
//     case "섹션04": return `<section><button>${text}</button>${imgTag}</section>`;
//     case "섹션07": return `<section><div>${text}</div>${imgTag}</section>`;
//     default: return "";
//   }
// };

// const componentMap = {
//   배너04: TpBanner04,
//   섹션02: Tpsection02,
//   섹션04: Tpsection04,
//   섹션07: Tpsection07,
// };

// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
//   return <div ref={dragRef} style={{ background: "#eee", padding: 8, marginBottom: 8 }}>{label}</div>;
// };

// const DropCanvas = ({ components, onDrop, onDelete, onEdit }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }));
//     return <div ref={dropRef} style={{ height: 40, border: "2px dashed #fff", margin: "10px 0", background: isOver ? "#444" : "transparent" }} />;
//   };

//   return (
//     <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400 }}>
//       {components.map((comp, i) => {
//         const Comp = componentMap[comp.type];
//         return (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
//               <Comp
//                 text={comp.text}
//                 img={comp.img}
//                 onEdit={(newData) => onEdit(i, newData)}
//               />
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{ position: "absolute", top: 10, right: 10, background: "#f33", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         );
//       })}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// function TpPage03() {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const handleDrop = (item, index) => {
//     const newItem = { ...item, text: "", img: "" }; // 기본값 설정
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, newItem);
//       return newComponents;
//     });
//   };

//   const handleEdit = (index, newData) => {
//     setDroppedComponents((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, ...newData } : c))
//     );
//   };

//   const handleDelete = (index) => {
//     setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmitOrder = async () => {
//     if (!email || !name) return alert("이름과 이메일을 입력해주세요.");
//     try {
//       await addDoc(collection(db, "orders"), {
//         user: { name, email },
//         components: droppedComponents,
//       });
//       alert("주문이 저장되었습니다!");
//     } catch (err) {
//       alert("저장 실패: " + err.message);
//     }
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents.map((c) => componentToHTML(c)).join("\n");
//     const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
//     const blob = new Blob([html], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ padding: "200px 0", background: "#222", zIndex: "1000" }}>
//         <div style={{ width: 240, position: "fixed", top: 100, right: 100, background: "#f4f4f4", padding: 20 }}>
//           <h4>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="배너04" label="배너04" />
//           <ComponentItem type="섹션02" label="섹션02" />
//           <ComponentItem type="섹션04" label="섹션04" />
//           <ComponentItem type="섹션07" label="섹션07" />

//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{ width: "100%", marginTop: 20 }} />
//           <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{ width: "100%", marginTop: 10 }} />

//           <button onClick={handleSubmitOrder} style={{ marginTop: 16, width: "100%" }}>📤 Firestore 저장</button>
//           <button onClick={handleBuild} style={{ marginTop: 8, width: "100%" }}>💾 HTML 다운로드</button>
//         </div>

//         <DropCanvas
//           components={droppedComponents}
//           onDrop={handleDrop}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       </div>
//     </DndProvider>
//   );
// }

// export default TpPage03;










// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// const componentToHTML = (comp) => {
//   const text = comp.text || "텍스트입니다";
//   const imgTag = comp.img ? `<img src='${comp.img}' alt='' />` : "";

//   switch (comp.type) {
//     case "배너04": return `<section><h2>${text}</h2>${imgTag}</section>`;
//     case "섹션02": return `<section><p>${text}</p>${imgTag}</section>`;
//     case "섹션04":
//       return comp.boxes?.map((box, i) => `
//         <section>
//           <h3>박스${i + 1}</h3>
//           <p>title: ${box.title}</p>
//           <p>subtitle: ${box.subtitle}</p>
//           <p>description: ${box.description}</p>
//         </section>
//       `).join("") || `<section><button>${text}</button>${imgTag}</section>`;
//     case "섹션07": return `<section><div>${text}</div>${imgTag}</section>`;
//     default: return "";
//   }
// };

// const componentMap = {
//   배너04: TpBanner04,
//   섹션02: Tpsection02,
//   섹션04: Tpsection04,
//   섹션07: Tpsection07,
// };

// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
//   return <div ref={dragRef} style={{ background: "#eee", padding: 8, marginBottom: 8 }}>{label}</div>;
// };

// const DropCanvas = ({ components, onDrop, onDelete, onEdit }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }));
//     return <div ref={dropRef} style={{ height: 40, border: "2px dashed #fff", margin: "10px 0", background: isOver ? "#444" : "transparent" }} />;
//   };

//   return (
//     <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400 }}>
//       {components.map((comp, i) => {
//         const Comp = componentMap[comp.type];
//         return (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
//               <Comp
//                 text={comp.text}
//                 img={comp.img}
//                 boxes={comp.boxes}
//                 onEdit={(newData) => onEdit(i, newData)}
//               />
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{ position: "absolute", top: 10, right: 10, background: "#f33", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         );
//       })}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// function TpPage03() {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const handleDrop = (item, index) => {
//     const newItem = {
//       ...item,
//       text: "",
//       img: "",
//       ...(item.type === "섹션04" ? {
//         boxes: [
//           { title: "", subtitle: "", description: "" },
//           { title: "", subtitle: "", description: "" },
//           { title: "", subtitle: "", description: "" },
//         ]
//       } : {})
//     };

//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, newItem);
//       return newComponents;
//     });
//   };

//   const handleEdit = (index, newData) => {
//     setDroppedComponents((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, ...newData } : c))
//     );
//   };

//   const handleDelete = (index) => {
//     setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmitOrder = async () => {
//     if (!email || !name) return alert("이름과 이메일을 입력해주세요.");
//     try {
//       await addDoc(collection(db, "orders"), {
//         user: { name, email },
//         components: droppedComponents.map((comp) => {
//           if (comp.type === "섹션04" && comp.boxes) {
//             return { ...comp, editedBoxes: comp.boxes };
//           }
//           return comp;
//         }),
//       });
//       alert("주문이 저장되었습니다!");
//     } catch (err) {
//       alert("저장 실패: " + err.message);
//     }
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents.map((c) => componentToHTML(c)).join("\n");
//     const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
//     const blob = new Blob([html], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ padding: "200px 0", background: "#222" }}>
//         <div style={{ width: 240, position: "fixed", top: 100, right: 100, background: "#f4f4f4", padding: 20 }}>
//           <h4>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="배너04" label="배너04" />
//           <ComponentItem type="섹션02" label="섹션02" />
//           <ComponentItem type="섹션04" label="섹션04" />
//           <ComponentItem type="섹션07" label="섹션07" />

//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{ width: "100%", marginTop: 20 }} />
//           <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{ width: "100%", marginTop: 10 }} />

//           <button onClick={handleSubmitOrder} style={{ marginTop: 16, width: "100%" }}>📤 Firestore 저장</button>
//           <button onClick={handleBuild} style={{ marginTop: 8, width: "100%" }}>💾 HTML 다운로드</button>
//         </div>

//         <DropCanvas
//           components={droppedComponents}
//           onDrop={handleDrop}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       </div>
//     </DndProvider>
//   );
// }

// export default TpPage03;














// TpPage03.jsx - 드래그, 수정, 이미지 업로드 및 Firestore 저장까지 완전한 구현
// TpPage03.jsx - 드래그, 텍스트 수정, 이미지 업로드 및 Firestore 저장까지 완전한 구현















// ✅ TpPage03.jsx - 수정된 전체 코드
// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { saveAs } from "file-saver";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// import TpBanner04 from "../components/TpBanner/TpBanner04";
// import Tpsection04 from "../components/TpSection/TpSection04";
// import Tpsection02 from "../components/TpSection/TpSection02";
// import Tpsection07 from "../components/TpSection/TpSection07";

// const componentToHTML = (comp) => {
//   const text = comp.text || "텍스트입니다";
//   const imgTag = comp.img ? `<img src='${comp.img}' alt='' />` : "";

//   switch (comp.type) {
//     case "배너04":
//       return `<section><h2>${text}</h2>${imgTag}</section>`;
//     case "섹션02":
//       return `<section><p>${text}</p>${imgTag}</section>`;
//     case "섹션04":
//       return `<section><button>${text}</button>${imgTag}</section>`;
//     case "섹션07":
//       return `<section><div>${text}</div>${imgTag}</section>`;
//     default:
//       return "";
//   }
// };

// const componentMap = {
//   배너04: TpBanner04,
//   섹션02: Tpsection02,
//   섹션04: Tpsection04,
//   섹션07: Tpsection07,
// };

// const ComponentItem = ({ type, label }) => {
//   const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
//   return (
//     <div ref={dragRef} style={{ background: "#eee", padding: 8, marginBottom: 8 }}>{label}</div>
//   );
// };

// const DropCanvas = ({ components, onDrop, onDelete, onEdit, onBoxEdit }) => {
//   const DropZone = ({ index }) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: "COMPONENT",
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }));
//     return (
//       <div ref={dropRef} style={{ height: 40, border: "2px dashed #fff", margin: "10px 0", background: isOver ? "#444" : "transparent" }} />
//     );
//   };

//   return (
//     <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400 }}>
//       {components.map((comp, i) => {
//         const Comp = componentMap[comp.type];
//         return (
//           <React.Fragment key={i}>
//             <DropZone index={i} />
//             <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
//               <Comp
//                 text={comp.text}
//                 img={comp.img}
//                 boxes={comp.boxes}
//                 onEdit={(newData) => onEdit(i, newData)}
//                 onBoxEdit={(updatedBoxes) => onBoxEdit(i, updatedBoxes)}
//               />
//               <button
//                 onClick={() => onDelete(i)}
//                 style={{ position: "absolute", top: 10, right: 10, background: "#f33", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
//               >
//                 삭제
//               </button>
//             </div>
//           </React.Fragment>
//         );
//       })}
//       <DropZone index={components.length} />
//     </div>
//   );
// };

// function TpPage03() {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const handleDrop = (item, index) => {
//     const newItem = { ...item };
//     if (item.type === "섹션04") {
//       newItem.boxes = [
//         {
//           title: "통밀 바게트",
//           subtitle: "건강한 시작을 위한 통밀의 고소함",
//           description: "식사빵으로도 어울리는 담백한 통밀 바게트...",
//         },
//         {
//           title: "시그니처 사워도우",
//           subtitle: "하루를 든든히 채워줄 풍미 깊은 한 조각",
//           description: "자연 그대로의 맛을 살린 사워도우...",
//         },
//         {
//           title: "오곡 크림 바게트",
//           subtitle: "겉은 바삭, 속은 촉촉.",
//           description: "볶은 곡물의 고소함이 입안 가득 퍼지는 시그니처 곡물 롤...",
//         },
//       ];
//     } else {
//       newItem.text = "";
//       newItem.img = "";
//     }
//     setDroppedComponents((prev) => {
//       const newComponents = [...prev];
//       newComponents.splice(index, 0, newItem);
//       return newComponents;
//     });
//   };

//   const handleEdit = (index, newData) => {
//     setDroppedComponents((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, ...newData } : c))
//     );
//   };

//   const handleBoxEdit = (index, updatedBoxes) => {
//     setDroppedComponents((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, boxes: updatedBoxes } : c))
//     );
//   };

//   const handleDelete = (index) => {
//     setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmitOrder = async () => {
//     if (!email || !name) return alert("이름과 이메일을 입력해주세요.");
//     try {
//       await addDoc(collection(db, "orders"), {
//         user: { name, email },
//         components: droppedComponents,
//       });
//       alert("주문이 저장되었습니다!");
//     } catch (err) {
//       alert("저장 실패: " + err.message);
//     }
//   };

//   const handleBuild = () => {
//     const htmlBody = droppedComponents.map((c) => componentToHTML(c)).join("\n");
//     const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
//     const blob = new Blob([html], { type: "text/html;charset=utf-8" });
//     saveAs(blob, "template.html");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ padding: "200px 0", background: "#222" }}>
//         <div style={{ width: 240, position: "fixed", top: 100, right: 100, background: "#f4f4f4", padding: 20 }}>
//           <h4>🧩 컴포넌트 목록</h4>
//           <ComponentItem type="배너04" label="배너04" />
//           <ComponentItem type="섹션02" label="섹션02" />
//           <ComponentItem type="섹션04" label="섹션04" />
//           <ComponentItem type="섹션07" label="섹션07" />

//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{ width: "100%", marginTop: 20 }} />
//           <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{ width: "100%", marginTop: 10 }} />

//           <button onClick={handleSubmitOrder} style={{ marginTop: 16, width: "100%" }}>📤 Firestore 저장</button>
//           <button onClick={handleBuild} style={{ marginTop: 8, width: "100%" }}>💾 HTML 다운로드</button>
//         </div>

//         <DropCanvas
//           components={droppedComponents}
//           onDrop={handleDrop}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//           onBoxEdit={handleBoxEdit}
//         />
//       </div>
//     </DndProvider>
//   );
// }

// export default TpPage03;











import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { saveAs } from "file-saver";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion"; // ✅ 부드러운 전환

import TpBanner04 from "../components/TpBanner/TpBanner04";
import TpBannerSwiper from "../components/TpBanner/TpBannerSwiper";
import TpLogoInfiniteSlider from "../components/TpSection/TpLogoInfiniteSlider";
import Tpsection04 from "../components/TpSection/TpSection04";
import Tpsection02 from "../components/TpSection/TpSection02";
import Tpsection07 from "../components/TpSection/TpSection07";
import TpSection06 from "../components/TpSection/TpSection06";

const componentMap = {
  배너04: TpBanner04,
  배너Swiper: TpBannerSwiper, // ✅ 추가
  배너로고슬라이드: TpLogoInfiniteSlider, // ✅ 추가  섹션02: Tpsection02,
  섹션04: Tpsection04,
  섹션06: TpSection06,
  섹션07: Tpsection07,
};

// ✅ 드래그 가능한 컴포넌트
const ComponentItem = ({ type, label }) => {
  const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
  return (
    <div
      ref={dragRef}
      style={{
        background: "#fff",
        padding: 50,
        cursor: "grab",
        borderBottom: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s",
      }}
    >
      {label}
    </div>
  );
};

// ✅ 상단 탭 메뉴
const SlideMenu = ({ visible, activeTab, setActiveTab, tabItems }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: 0,
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {/* 탭 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 0",
          borderBottom: "1px solid #ccc",
        }}
      >
        {Object.keys(tabItems).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              margin: "0 12px",
              background: activeTab === tab ? "#000" : "transparent",
              color: activeTab === tab ? "#fff" : "#000",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              borderRadius: 6,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 컴포넌트 목록 전환 영역 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            gap: 20,
            padding: 20,
            justifyContent: "center",
            background: "#f9f9f9",
          }}
        >
          {tabItems[activeTab].map((item) => (
            <ComponentItem key={item.type} type={item.type} label={item.label} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


const DropCanvas = ({ components, onDrop, onDelete, onEdit, onBoxEdit, onUpdate }) => {
  const DropZone = ({ index }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "COMPONENT",
      drop: (item) => onDrop(item, index),
      collect: (monitor) => ({ isOver: monitor.isOver() })
    }));
    return <div ref={dropRef} style={{ height: 40, border: "2px dashed #fff", margin: "10px 0", background: isOver ? "#444" : "transparent" }} />;
  };

  return (
    <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400, paddingTop: 200 }}>
      {components.map((comp, i) => {
        const Comp = componentMap[comp.type];
        return (
          <React.Fragment key={comp.id ?? i}>
            <DropZone index={i} />
            <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
              <Comp
                text={comp.text}
                img={comp.img}
                boxes={comp.boxes}
                titleText={comp.titleText}
                subTitleText={comp.subTitleText}
                align={comp.align}
                data={comp.data}
                onEdit={(newData) => onEdit(i, newData)}
                onBoxEdit={(updatedData) => onBoxEdit(i, updatedData)}
                onUpdate={(updatedData) => onUpdate(i, updatedData)}
              />
              <button
                onClick={() => onDelete(i)}
                style={{ position: "absolute", top: 10, right: 10, background: "#f33", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
              >
                삭제
              </button>
            </div>
          </React.Fragment>
        );
      })}
      <DropZone index={components.length} />
    </div>
  );
};

function TpPage03() {
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("인트로배너");

  const tabItems = {
    인트로배너: [{ type: "배너04", label: "배너04" },
    { type: "배너Swiper", label: "배너 스와이퍼" }],
    중간섹션: [
      { type: "섹션02", label: "섹션02" },
      { type: "섹션04", label: "섹션04" },
      { type: "섹션06", label: "섹션06" },
      { type: "섹션07", label: "섹션07" },
      { type: "배너로고슬라이드", label: "로고 슬라이드" }
    ],
  };

  const handleDrop = (item, index) => {
    const newItem = { ...item, id: Date.now() + Math.random() };
    if (item.type === "배너로고슬라이드") {
      newItem.logos = [
        { id: 1, imageUrl: "https://via.placeholder.com/120x60?text=Logo1" },
        { id: 2, imageUrl: "https://via.placeholder.com/120x60?text=Logo2" },
      ];
    }
    else if (item.type === "배너Swiper") {
      newItem.slides = [
        { title: "슬라이드 1", subTitle: "서브1", imageUrl: "", align: "center" },
        { title: "슬라이드 2", subTitle: "서브2", imageUrl: "", align: "center" },
      ];
    }
    else if (item.type === "섹션04") {
      newItem.boxes = [
        { title: "통밀 바게트", subtitle: "건강한 시작을 위한 통밀의 고소함", description: "식사빵으로도 어울리는 담백한 통밀 바게트...", imageClass: "" },
        { title: "시그니처 사워도우", subtitle: "하루를 든든히 채워줄 풍미 깊은 한 조각", description: "자연 그대로의 맛을 살린 사워도우...", imageClass: "" },
        { title: "오곡 크림 바게트", subtitle: "겉은 바삭, 속은 촉촉.", description: "볶은 곡물의 고소함이 입안 가득 퍼지는 시그니처 곡물 롤...", imageClass: "" },
      ];
      newItem.titleText = "기본 제목";
      newItem.subTitleText = "기본 서브제목";
      newItem.align = "center";
    } else if (item.type === "섹션02") {
      newItem.text = "기본 텍스트";
      newItem.img = "";
    } else if (item.type === "섹션07") {
      newItem.data = [
        { percentage: 88, label: "고객 만족도" },
        { percentage: 75, label: "서비스 도입률" },
        { percentage: 63, label: "재구매율" },
      ];
    } else if (item.type === "섹션06") {
      newItem.data = [
        { question: "Q. 어떤 기준으로 빵을 만드나요?", answer: "A. 건강한 재료와 정직한 공정을 가장 중요하게 생각합니다." },
        { question: "Q. 바쁜 일상 속에서도 구매할 수 있나요?", answer: "A. 온라인 예약 및 픽업도 지원하고 있어요." }
      ];
      newItem.titleText = "자주 묻는 질문들";
      newItem.subTitleText = "자주 들어오는 질문과 답변을 모았습니다.";
      newItem.align = "center";
    }

    setDroppedComponents((prev) => {
      const newComponents = [...prev];
      newComponents.splice(index, 0, newItem);
      return newComponents;
    });
  };

  const handleEdit = (index, newData) => {
    setDroppedComponents((prev) => prev.map((c, i) => (i === index ? { ...c, ...newData } : c)));
  };

  const handleBoxEdit = (index, updatedData) => {
    setDroppedComponents((prev) => prev.map((c, i) => (i === index ? { ...c, ...updatedData } : c)));
  };

  const handleUpdate = (index, updatedData) => {
    setDroppedComponents((prev) => prev.map((c, i) => (i === index ? { ...c, data: updatedData.data, titleText: updatedData.titleText, subTitleText: updatedData.subTitleText, align: updatedData.align } : c)));
  };

  const handleDelete = (index) => {
    setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUndefined = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(removeUndefined);
    } else if (typeof obj === "object" && obj !== null) {
      const cleaned = {};
      for (let key in obj) {
        if (obj[key] !== undefined) {
          cleaned[key] = removeUndefined(obj[key]);
        }
      }
      return cleaned;
    }
    return obj;
  };

  const handleSubmitOrder = async () => {
    if (!email || !name) return alert("이름과 이메일을 입력해주세요.");
    try {
      const cleanComponents = removeUndefined(droppedComponents);

      await addDoc(collection(db, "orders"), {
        user: { name, email },
        components: cleanComponents,
        createdAt: serverTimestamp(),
      });

      alert("주문이 저장되었습니다!");
    } catch (err) {
      alert("저장 실패: " + err.message);
      console.error("🔥 Firestore 저장 오류:", err);
    }
  };

  const handleBuild = () => {
    const htmlBody = droppedComponents.map((c) => `<section>${c.text || ""}</section>`).join("\n");
    const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, "template.html");
  };

// ✅ TpBanner04.jsx 포함 / 미리보기 페이지를 실제 렌더링 형태로 구성
const handlePreview = () => {
  const previewWindow = window.open("", "_blank", "width=1200,height=800");

  const style = `
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: 'Pretendard', sans-serif; background: #fff; color: #333; }
      section { padding: 60px; }
      .tpBanner04 {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding: 0 50px;
        color: white;
      }
      .tpBanner04__background {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        z-index: 1;
        filter: brightness(80%);
      }
      .tpBanner04__text {
        position: relative;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
      }
      .tpBanner04__text h2 { font-size: 60px; margin-bottom: 16px; }
      .tpBanner04__text p { font-size: 22px; margin-bottom: 30px; }
      .tpBanner04__text .btn {
        border-radius: 100px;
        border: none;
        padding: 14px 30px;
        font-size: 18px;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
      }
      .section04-box {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }
      .section04-box .item {
        width: 300px;
        border: 1px solid #ccc;
        padding: 16px;
      }
      .section04-box .item-image {
        width: 100%;
        height: 180px;
        background-size: cover;
        background-position: center;
        margin-bottom: 12px;
      }
    </style>
  `;

  const body = droppedComponents.map((c) => {
    if (c.type === "배너04") {
      return `
        <section class="tpBanner04">
          ${c.mediaType === "video"
            ? `<video class="tpBanner04__background" autoplay loop muted playsinline><source src="${c.mediaUrl}" type="video/mp4"></video>`
            : `<div class="tpBanner04__background" style="background-image:url('${c.mediaUrl}')"></div>`}
          <div class="tpBanner04__text" style="text-align:${c.align}">
            <h2 class="title">${c.title}</h2>
            <p class="subTitle">${c.subTitle}</p>
            <button class="btn">지금 문의하기</button>
          </div>
        </section>
      `;
    }

    if (c.type === "섹션04") {
      return `
        <section>
          <h2 style="text-align:${c.align}">${c.titleText || ""}</h2>
          <p style="text-align:${c.align}">${c.subTitleText || ""}</p>
          <div class="section04-box">
            ${(c.boxes || []).map((box) => `
              <div class="item">
                <div class="item-image" style="background-image:url('${box.imageClass || ""}')"></div>
                <h3>${box.title}</h3>
                <p>${box.subtitle}</p>
                <p>${box.description}</p>
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }

    // 기본 섹션 (예: section02, 06, 07)
    return `
      <section>
        <h2 style="text-align:${c.align || 'center'}">${c.titleText || c.title || ""}</h2>
        <p style="text-align:${c.align || 'center'}">${c.subTitleText || c.subTitle || c.text || ""}</p>
      </section>
    `;
  }).join("");

  previewWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">${style}</head><body>${body}</body></html>`);
  previewWindow.document.close();
};



  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ paddingTop: 320, background: "#222", minHeight: "100vh" }}>
        <SlideMenu visible={true} activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />

        <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: 20, color: "white" }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{ width: 200, height: 50, padding: "10px", borderRadius: "10px", border: "none", outline: "none" }} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{ width: 200, height: 50, padding: "10px", borderRadius: "10px", border: "none", outline: "none" }} />
          <button onClick={handleSubmitOrder} style={{ marginLeft: "100px", borderRadius: "10px", padding: "10px" }}>📤 Firestore 저장</button>
          <button onClick={handleBuild} style={{ borderRadius: "10px", padding: "10px" }}>💾 HTML 다운로드</button>
          <button onClick={handlePreview} style={{ borderRadius: "10px", padding: "10px" }}>🖥 미리보기 보기</button>
        </div>

        <DropCanvas
          components={droppedComponents}
          onDrop={handleDrop}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onBoxEdit={handleBoxEdit}
          onUpdate={handleUpdate}
        />
      </div>
    </DndProvider>
  );
}

export default TpPage03;




