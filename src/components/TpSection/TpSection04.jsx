// import React, { useEffect,useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { Link } from "react-router-dom";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Tpsection04() {

//     const sectionRef = useRef();
//     useLayoutEffect(() => {
//         let ctx;
//         const setAnimation = () => {
//             if(ctx) ctx.revert();
//             ctx = gsap.context(() => {
//                 const isMobile = window.innerWidth <= 960;
//                 if (isMobile) {
//                     const boxes = gsap.utils.toArray(".box");
//                     gsap.utils.toArray(".box").forEach((box, i) => {
//                         gsap.from(box, {
//                             y: 100,
//                             opacity: 0,
//                             duration: 0.7,
//                             ease: "power2.out",
//                             scrollTrigger: {
//                                 trigger: box,
//                                 start: "top 75%",
//                                 toggleActions: "play none none reverse"
//                             }
//                         });
//                     });
//                     setTimeout(() => {
//                         ScrollTrigger.refresh();
//                     },200)
//                 } else {
//                     gsap.from(".tpSection04__titleArea",{
//                         y: 100,
//                         opacity: 0,
//                         duration: 0.7,  
//                         ease: "power2.out",
//                         scrollTrigger: {
//                             trigger: ".tpSection04__titleArea",
//                             start: "top 80%",
//                             toggleActions: "play none none reverse"
//                         }
//                     });
//                     const boxes = gsap.utils.toArray(".box");
//                     gsap.utils.toArray(".box").forEach((box, i) => {
//                         gsap.from(box, {
//                             y: 100,
//                             opacity: 0,
//                             duration: 0.7,
//                             ease: "power2.out",
//                             scrollTrigger: {
//                                 trigger: box,
//                                 start: "top 80%",
//                                 toggleActions: "play none none reverse"
//                             }
//                         });
//                     });
//                 }
//             },sectionRef);
//         };
//         setAnimation();
//         const handleResize = () => {
//             setAnimation();
//             ScrollTrigger.refresh();
//         };
//         window.addEventListener("resize", handleResize);
//         return () => {
//             if(ctx) ctx.revert();
//             window.removeEventListener("resize", handleResize);
//         }
//     },[])


//   return (
//     <section 
//       className="tpSection04"
//       id="part2"
//       ref={sectionRef}
//     >
//         {/* <div className="tpSection04__titleArea">
//             <h2 className="titleText">
//                 정성든 한 끼, <span class="mobile-br" />삶의 방향이 됩니다.
//             </h2>
//             <h3 className="subTitleText">
//                 건강과 지속가능성을 생각하며, 바쁜 일상 속에도<span class="mobile-br" />당신을 위한 따뜻한 식사를 준비합니다.
//             </h3>
//         </div> */}

//         <div className="tpSection04__titleArea">
//             <h2 className="titleText">
//                 모리커피 와 함께하는 빵을 만나보아요
//             </h2>
//             <h3 className="subTitleText">
//                 천연 발효, 무첨가 통밀, 그리고 매일 굽는 신선함.  
//                 내 몸이 먼저 알아보는 빵의 차이를 직접 느껴보세요.
//             </h3>
//         </div>

//         <div className="tpSection04__container">


//             <Link
//                 to="/productPage01"
//                 className="box"
//             >
//                 <div className="box__img box01"/>
//                 <h3 className="box__title">
//                     통밀 바게트
//                 </h3>
//                 <p className="box__subTitle">
//                     건강한 시작을 위한 통밀의 고소함
//                 </p>
//                 <p className="box__subTitle">
//                     식사빵으로도 어울리는 담백한 통밀 바게트.
//                     불필요한 첨가물을 넣지 않고, 천연 발효 방식으로 구워
//                     식감은 바삭하고 속은 쫄깃하게 살아있습니다.
//                     당신의 식탁 위에 건강을 더해보세요.
//                 </p>
//             </Link>
//             <Link
//                 to="/about"
//                 className="box"
//             >                
//                 <div className="box__img box02"/>
//                 <h3 className="box__title">
//                     시그니처 사워도우
//                 </h3>
//                 <p className="box__subTitle">
//                     하루를 든든히 채워줄 풍미 깊은 한 조각
//                 </p>
//                 <p className="box__subTitle">
//                     장시간 저온 발효로 완성된 깊은 풍미와
//                     자연 그대로의 맛을 살린 사워도우.
//                     아침엔 버터와 함께, 점심엔 샌드위치로.
//                     매 끼니가 특별해지는 우리만의 대표 메뉴입니다.
//                 </p>
//             </Link>
//             <Link
//                 to="/about"
//                 className="box"
//             >                
//                 <div className="box__img box03"/>
//                 <h3 className="box__title">
//                     곡물 파테 바게트
//                 </h3>
//                 <p className="box__subTitle">
//                     정성 한 스푼, 영양 한 조각
//                 </p>
//                 <p className="box__subTitle">
//                     하루 한 끼를 책임질 든든한 식사빵.
//                     오트와 해바라기씨가 더해진 통곡물 바게트에
//                     직접 만든 곡물 파테를 곁들이면,
//                     바쁜 아침도 건강하고 여유롭게 시작할 수 있습니다.
//                 </p>
//             </Link>
//             <Link
//                 to="/about"
//                 className="box"
//             >                
//                 <div className="box__img box04"/>
//                 <h3 className="box__title">
//                     오곡 크림 바게트
//                 </h3>
//                 <p className="box__subTitle">
//                     겉은 바삭, 속은 촉촉.
//                 </p>
//                 <p className="box__subTitle">
//                     자연 발효와 볶은 곡물의 고소함이 입안 가득 퍼지는
//                     시그니처 곡물 롤은 식사, 간식, 와인 안주로도 완벽하게 어울립니다.
//                     바쁜 하루, 단 하나의 빵으로도 삶의 리듬을 정돈해보세요.
//                 </p>
//             </Link>
//             <Link
//                 to="/about"
//                 className="box"
//             >                
//                 <div className="box__img box05"/>
//                 <h3 className="box__title">
//                     오곡 크림 바게트
//                 </h3>
//                 <p className="box__subTitle">
//                     겉은 바삭, 속은 촉촉.
//                 </p>
//                 <p className="box__subTitle">
//                     자연 발효와 볶은 곡물의 고소함이 입안 가득 퍼지는
//                     시그니처 곡물 롤은 식사, 간식, 와인 안주로도 완벽하게 어울립니다.
//                     바쁜 하루, 단 하나의 빵으로도 삶의 리듬을 정돈해보세요.
//                 </p>
//             </Link>
//             <Link
//                 to="/about"
//                 className="box"
//             >                
//                 <div className="box__img box06"/>
//                 <h3 className="box__title">
//                     오곡 크림 바게트트
//                 </h3>
//                 <p className="box__subTitle">
//                     겉은 바삭, 속은 촉촉.
//                 </p>
//                 <p className="box__subTitle">
//                     자연 발효와 볶은 곡물의 고소함이 입안 가득 퍼지는
//                     시그니처 곡물 롤은 식사, 간식, 와인 안주로도 완벽하게 어울립니다.
//                     바쁜 하루, 단 하나의 빵으로도 삶의 리듬을 정돈해보세요.
//                 </p>
//             </Link>
//         </div>
//     </section>
//   );
// }

// export default Tpsection04;








/// ✅ Tpsection04.jsx (상단 제목, 박스 데이터 수정 시 실시간 반영)
// ✅ Tpsection04.jsx (이미지 미리보기 크기 축소 + 업로드 오류 방지 개선)
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const EditBoxModal = ({ data, onChange, onClose }) => {
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [description, setDescription] = useState(data.description);
  const [imageClass, setImageClass] = useState(data.imageClass);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `section04/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log("✅ 업로드된 이미지 URL:", url);
    setImageClass(url);
  };

  useEffect(() => {
    onChange?.({ title, subtitle, description, imageClass });
  }, [title, subtitle, description, imageClass]);

  return (
    <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
      <button onClick={onClose} style={{ float: "right" }}>❌</button>
      <h3>항목 수정</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" style={{ width: "100%" }} />
      <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="서브제목" style={{ width: "100%" }} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명" style={{ width: "100%" }} />
      <input type="file" onChange={handleImageUpload} style={{ marginTop: 10 }} />
      {imageClass && (
        <img src={imageClass} alt="미리보기" style={{ width: "100%", maxHeight: 150, objectFit: "contain", marginTop: 10, borderRadius: 4 }} />
      )}
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const EditTitleModal = ({ titleText, subTitleText, align, onChange, onClose }) => {
  const [title, setTitle] = useState(titleText);
  const [subTitle, setSubTitle] = useState(subTitleText);
  const [textAlign, setTextAlign] = useState(align || "center");

  useEffect(() => {
    onChange?.({ titleText: title, subTitleText: subTitle, textAlign });
  }, [title, subTitle, textAlign]);

  const getButtonStyle = (value) => ({
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: textAlign === value ? "#007bff" : "#f0f0f0",
    color: textAlign === value ? "white" : "black"
  });

  return (
    <div style={{ position: "fixed", top: 100, left: 100, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
      <button onClick={onClose} style={{ float: "right" }}>❌</button>
      <h3>제목 수정</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="메인 제목" style={{ width: "100%", marginBottom: 10 }} />
      <textarea value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="서브 제목" style={{ width: "100%", marginBottom: 10 }} />

      <div style={{ display: "flex", gap: "8px", marginBottom: 10 }}>
        <button onClick={() => setTextAlign("left")} style={getButtonStyle("left")}>좌측</button>
        <button onClick={() => setTextAlign("center")} style={getButtonStyle("center")}>중앙</button>
        <button onClick={() => setTextAlign("right")} style={getButtonStyle("right")}>우측</button>
      </div>

      <button onClick={onClose}>닫기</button>
    </div>
  );
};

function Tpsection04({ boxes = [], titleText: initialTitle, subTitleText: initialSub, align: initialAlign, onBoxEdit }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [boxData, setBoxData] = useState(boxes);
  const [titleText, setTitleText] = useState(initialTitle || "모리커피 와 함께하는 빵을 만나보아요");
  const [subTitleText, setSubTitleText] = useState(initialSub || "천연 발효, 무첨가 통밀, 그리고 매일 굽는 신선함.\n내 몸이 먼저 알아보는 빵의 차이를 직접 느껴보세요.");
  const [textAlign, setTextAlign] = useState(initialAlign || "center");

  const handleUpdateBox = (index, newData) => {
    const updatedBoxes = boxData.map((box, i) => i === index ? { ...box, ...newData } : box);
    setBoxData(updatedBoxes);
  };

  const handleAddBox = () => {
    const newBox = {
      title: "기본 제목입니다.",
      subtitle: "기본 서브제목입니다.",
      description: "기본 추가 텍스트입니다.",
      link: "/about",
      imageClass: "",
    };
    setBoxData([...boxData, newBox]);
  };

  const handleTitleChange = ({ titleText, subTitleText, textAlign }) => {
    setTitleText(titleText);
    setSubTitleText(subTitleText);
    setTextAlign(textAlign);
  };

  useEffect(() => {
    onBoxEdit?.({ boxes: boxData, titleText, subTitleText, textAlign });
  }, [boxData, titleText, subTitleText, textAlign]);

  return (
    <section className="tpSection04">
      <div
        className="tpSection04__titleArea"
        onClick={() => setEditingTitle(true)}
        style={{ cursor: "pointer", textAlign }}
      >
        <h2 className="titleText">{titleText}</h2>
        <h3 className="subTitleText">
          {subTitleText?.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h3>
      </div>

      <div className="tpSection04__container" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {boxData.map((item, index) => (
          <div key={index} className="box" onClick={() => setEditingIndex(index)} style={{ width: "32%", minWidth: "300px", cursor: "pointer" }}>
            {item.imageClass ? (
              <div
                className="box__img"
                style={{
                  backgroundImage: `url(${item.imageClass})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "240px",
                }}
              />
            ) : (
              <div style={{ height: "240px", backgroundColor: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                이미지 없음
              </div>
            )}
            <h3 className="box__title">{item.title}</h3>
            <p className="box__subTitle">{item.subtitle}</p>
            <p className="box__subTitle">{item.description}</p>
          </div>
        ))}
        <button onClick={handleAddBox} style={{ height: "240px", width: "250px", fontSize: "24px" }}>+ 박스 추가</button>
      </div>

      {editingIndex !== null && (
        <EditBoxModal
          data={boxData[editingIndex]}
          onChange={(newData) => handleUpdateBox(editingIndex, newData)}
          onClose={() => setEditingIndex(null)}
        />
      )}

      {editingTitle && (
        <EditTitleModal
          titleText={titleText}
          subTitleText={subTitleText}
          align={textAlign}
          onChange={handleTitleChange}
          onClose={() => setEditingTitle(false)}
        />
      )}
    </section>
  );
}

export default Tpsection04;











///////////////////////////////
// Tpsection04.jsx (box__img을 background-image로 연결하도록 수정)
// Tpsection04.jsx (단일 아이템 컴포넌트화 버전)
// Tpsection04.jsx (이미지 background 적용 완료 버전)
// Tpsection04.jsx (SCSS 적용되는 구조로 수정된 완전한 형태)
// Tpsection04.jsx (box__img SCSS와 구조 일치 + backgroundImage 제대로 적용)
// import React, { useState } from "react";
// import { storage } from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const EditModal = ({ data, onSave, onClose }) => {
//   const [text, setText] = useState(data.text || "");
//   const [img, setImg] = useState(data.img || "");

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
//     await uploadBytes(storageRef, file);
//     const url = await getDownloadURL(storageRef);
//     setImg(url);
//   };

//   return (
//     <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
//       <button onClick={onClose} style={{ float: "right" }}>❌</button>
//       <h3>텍스트/이미지 수정</h3>
//       <input value={text} onChange={(e) => setText(e.target.value)} placeholder="텍스트 입력" style={{ width: "100%", marginBottom: 10 }} />
//       <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
//       {img && <div style={{ marginTop: 10 }}><img src={img} alt="preview" style={{ width: 100 }} /></div>}
//       <button onClick={() => onSave({ text, img })} style={{ marginTop: 10 }}>저장</button>
//     </div>
//   );
// };

// function Tpsection04({ text = "", img, onEdit }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleSave = (data) => {
//     onEdit?.(data);
//     setShowModal(false);
//   };

//   return (
//     <section className="tpSection04" style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
//       <div className="tpSection04__container">
//         <div className="box">
//           <div
//             className="box__img"
//             style={img ? {
//               backgroundImage: `url(${img})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               height: "350px",
//               borderRadius: "10px"
//             } : {
//               backgroundColor: "#ccc",
//               height: "350px",
//               borderRadius: "10px"
//             }}
//           ></div>
//           <h2 className="box__title">{text || "모리커피 와 함께하는 빵을 만나보아요"}</h2>
//           <p className="box__subTitle">
//             천연 발효, 무첨가 통밀, 그리고 매일 굽는 신선함.<br />
//             내 몸이 먼저 알아보는 빵의 차이를 직접 느껴보세요.
//           </p>
//         </div>
//       </div>

//       {showModal && (
//         <EditModal
//           data={{ text, img }}
//           onSave={handleSave}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </section>
//   );
// }

// export default Tpsection04;












// 🔥 Tpsection04 컴포넌트를 props 기반으로 리팩토링하고, TpPage03에서 수정된 텍스트가 Firestore에 저장되도록 구성 + 클릭 시 수정 가능
// import React, { useState } from "react";

// const EditModal = ({ data, onSave, onClose }) => {
//   const [text, setText] = useState(data.text || "");
//   const [img, setImg] = useState(data.img || "");

//   return (
//     <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
//       <button onClick={onClose} style={{ float: "right" }}>❌</button>
//       <h3>섹션04 텍스트 수정</h3>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="텍스트 입력"
//         style={{ width: "100%", marginBottom: 10 }}
//       />
//       <input
//         value={img}
//         onChange={(e) => setImg(e.target.value)}
//         placeholder="이미지 주소 입력"
//         style={{ width: "100%" }}
//       />
//       <button onClick={() => onSave({ text, img })} style={{ marginTop: 10 }}>저장</button>
//     </div>
//   );
// };

// function Tpsection04({ text = "모리커피 와 함께하는 빵을 만나보아요", img, onEdit }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleSave = (newData) => {
//     onEdit?.(newData);
//     setShowModal(false);
//   };

//   return (
//     <section className="tpSection04" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
//       <div className="tpSection04__titleArea">
//         <h2 className="titleText">{text}</h2>
//         <h3 className="subTitleText">
//           천연 발효, 무첨가 통밀, 그리고 매일 굽는 신선함.<br />
//           내 몸이 먼저 알아보는 빵의 차이를 직접 느껴보세요.
//         </h3>
//         {img && (
//           <div style={{ marginTop: "20px" }}>
//             <img src={img} alt="사용자 삽입 이미지" style={{ maxWidth: "100%", height: "auto" }} />
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <EditModal
//           data={{ text, img }}
//           onSave={handleSave}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </section>
//   );
// }

// export default Tpsection04;






// Tpsection04.jsx (이미지 업로드 + 모달 수정 + X 버튼 정상 동작)
// // Tpsection04.jsx (이미지 업로드 + 모달 수정 + X 버튼 정상 동작)
// import React, { useState } from "react";
// import { storage } from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const EditModal = ({ data, onSave, onClose }) => {
//   const [text, setText] = useState(data.text || "");
//   const [img, setImg] = useState(data.img || "");

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
//     await uploadBytes(storageRef, file);
//     const url = await getDownloadURL(storageRef);
//     setImg(url);
//   };

//   return (
//     <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
//       <div style={{ marginBottom: 10 }}>
//         <button onClick={onClose} style={{ float: "right", cursor: "pointer" }}>❌</button>
//         <h3>섹션04 수정</h3>
//       </div>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="텍스트 입력"
//         style={{ width: "100%", marginBottom: 10 }}
//       />
//       <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
//       {img && (
//         <div style={{ marginTop: 10 }}>
//           <img src={img} alt="preview" style={{ width: 120, borderRadius: 4 }} />
//         </div>
//       )}
//       <button onClick={() => onSave({ text, img })} style={{ marginTop: 10 }}>저장</button>
//     </div>
//   );
// };

// function Tpsection04({ text = "모리커피 와 함께하는 빵을 만나보아요", img, onEdit }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleSave = (newData) => {
//     onEdit?.(newData);
//     setShowModal(false);
//   };

//   return (
//     <section className="tpSection04" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
//       <div className="tpSection04__titleArea">
//         <h2 className="titleText">{text}</h2>
//         <h3 className="subTitleText">
//           천연 발효, 무첨가 통밀, 그리고 매일 굽는 신선함.<br />
//           내 몸이 먼저 알아보는 빵의 차이를 직접 느껴보세요.
//         </h3>
//         {img && (
//           <div style={{ marginTop: "20px" }}>
//             <img src={img} alt="사용자 이미지" style={{ maxWidth: "100%", height: "auto" }} />
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <EditModal
//           data={{ text, img }}
//           onSave={handleSave}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </section>
//   );
// }

// export default Tpsection04;
