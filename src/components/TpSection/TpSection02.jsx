// // ✅ Tpsection02.jsx (상단 제목, 박스 데이터 수정 시 실시간 반영)
// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Tpsection02 = ({ text = "건강한 한끼를 위해서\n제대로된 식사를 제공합니다.", boxes = [], align = 'center', onBoxEdit }) => {
//   const defaultBoxes = [
//     {
//       num: "01",
//       title: "식사에 진심인\n사람들을 위해",
//       description1: "빠르게 끝내는 식사가 아닌, 영양과 균형을 생각한 식사입니다.",
//       description2: "진짜 식사는 준비부터 다릅니다."
//     },
//     {
//       num: "02",
//       title: "매일 반복되는 식사,\n지루하지 않게",
//       description1: "다양한 식단으로 식사의 즐거움을 더합니다.",
//       description2: "매일 다른 메뉴, 매일 새로운 활력."
//     },
//     {
//       num: "03",
//       title: "편리함과 건강,\n두 마리 토끼를 동시에",
//       description1: "간편함을 원해도 건강은 포기금지. 준비는 우리가 선택은 당신의 몫입니다.",
//       description2: "집에서도, 사무실에서도 완벽한 한 끼."
//     },
//   ];

//   const [mainText, setMainText] = useState(text);
//   const [textAlign, setTextAlign] = useState(align);
//   const [content, setContent] = useState(boxes.length ? boxes : defaultBoxes);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingTitle, setEditingTitle] = useState(false);

//   const sectionRef = useRef();

//   useLayoutEffect(() => {
//     let ctx;
//     const setAnimation = () => {
//       if (ctx) ctx.revert();
//       ctx = gsap.context(() => {
//         const isMobile = window.innerWidth <= 960;
//         const titleSelector = ".tpSection02__title";
//         const boxSelector = ".subBox";
  
//         gsap.from(titleSelector, {
//           y: 100,
//           opacity: 0,
//           duration: 0.7,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: titleSelector,
//             start: isMobile ? "top 90%" : "top 85%",
//             toggleActions: "play none none reverse"
//           }
//         });
  
//         gsap.utils.toArray(boxSelector).forEach((box, i) => {
//           gsap.from(box, {
//             y: 100,
//             opacity: 0,
//             duration: 0.6,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: box,
//               start: isMobile ? "top 93%" : "top 75%",
//               toggleActions: "play none none reverse"
//             },
//             delay: i * 0.1
//           });
//         });
  
//         ScrollTrigger.refresh(); // 🔥 위치 중요: 마지막에 반드시 refresh
//       }, sectionRef);
//     };
  
//     setAnimation();
  
//     const handleResize = () => {
//       setAnimation();
//       ScrollTrigger.refresh();
//     };
//     window.addEventListener("resize", handleResize);
  
//     return () => {
//       if (ctx) ctx.revert();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [mainText, content]); // 🔥 데이터가 바뀌면 애니메이션 다시 적용
  
//   useEffect(() => {
//     // 페이지 변경 등으로 위치가 바뀐 직후 강제 재계산
//     const timeout = setTimeout(() => {
//       ScrollTrigger.refresh(true);
//     }, 300); // 충분히 렌더링된 후
  
//     return () => clearTimeout(timeout);
//   }, [pages]); // 👈 혹은 components 배열이 바뀔 때도 가능
  

//   useEffect(() => {
//     onBoxEdit?.({ text: mainText, boxes: content, align: textAlign });
//   }, [mainText, content, textAlign]);

//   const handleUpdateBox = (index, updatedData) => {
//     const newBoxes = content.map((b, i) => (i === index ? updatedData : b));
//     setContent(newBoxes);
//   };

//   const handleTitleChange = (text, align) => {
//     setMainText(text);
//     setTextAlign(align);
//   };

//   return (
//     <section className="tpSection02" ref={sectionRef} id="part1">
//       <h2
//         className="tpSection02__title"
//         style={{ textAlign, cursor: 'pointer' }}
//         onClick={() => setEditingTitle(true)}
//       >
//         {mainText.split('\n').map((line, i) => (
//           <span key={i}>{line}<br /></span>
//         ))}
//       </h2>

//       <div className="tpSection02__mainBox">
//         {content.map((box, i) => (
//           <div className="subBox" key={i} onClick={() => setEditingIndex(i)}>
//             <div className="numText">{box.num}</div>
//             <div className="titleText">
//               {box.title.split("\n").map((line, idx) => (
//                 <span key={idx}>{line}<br /></span>
//               ))}
//             </div>
//             <hr />
//             <div className="subTitleText">
//               <p>{box.description1}</p>
//               <p>{box.description2}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {editingTitle && (
//         <EditTitleModal
//           text={mainText}
//           align={textAlign}
//           onChange={handleTitleChange}
//           onClose={() => setEditingTitle(false)}
//         />
//       )}

//       {editingIndex !== null && (
//         <EditBoxModal
//           data={content[editingIndex]}
//           onChange={(updated) => handleUpdateBox(editingIndex, updated)}
//           onClose={() => setEditingIndex(null)}
//         />
//       )}
//     </section>
//   );
// };

// const EditTitleModal = ({ text, align, onChange, onClose }) => {
//   const [newText, setNewText] = useState(text);
//   const [newAlign, setNewAlign] = useState(align);

//   useEffect(() => {
//     onChange(newText, newAlign);
//   }, [newText, newAlign]);

//   return (
//     <div style={{ position: 'fixed', top: 100, left: 100, background: '#fff', padding: 20, border: '1px solid #ccc', zIndex: 9999 }}>
//       <button onClick={onClose} style={{ float: 'right' }}>❌</button>
//       <h3>상단 타이틀 수정</h3>
//       <textarea
//         value={newText}
//         onChange={(e) => setNewText(e.target.value)}
//         rows={4}
//         style={{ width: '100%', marginBottom: 10 }}
//       />
//       <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
//         {['left', 'center', 'right'].map((opt) => (
//           <button
//             key={opt}
//             onClick={() => setNewAlign(opt)}
//             style={{
//               padding: '6px 12px',
//               border: '1px solid #ccc',
//               background: newAlign === opt ? '#007bff' : '#eee',
//               color: newAlign === opt ? '#fff' : '#000'
//             }}
//           >
//             {opt}
//           </button>
//         ))}
//       </div>
//       <button onClick={onClose}>닫기</button>
//     </div>
//   );
// };

// const EditBoxModal = ({ data, onChange, onClose }) => {
//   const [num, setNum] = useState(data.num);
//   const [title, setTitle] = useState(data.title);
//   const [description1, setDescription1] = useState(data.description1);
//   const [description2, setDescription2] = useState(data.description2);

//   useEffect(() => {
//     onChange({ num, title, description1, description2 });
//   }, [num, title, description1, description2]);

//   return (
//     <div style={{ position: 'fixed', top: 100, left: 100, background: '#fff', padding: 20, border: '1px solid #ccc', zIndex: 9999 }}>
//       <button onClick={onClose} style={{ float: 'right' }}>❌</button>
//       <h3>내용 수정</h3>
//       <input value={num} onChange={(e) => setNum(e.target.value)} placeholder="번호" style={{ width: '100%', marginBottom: 10 }} />
//       <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" style={{ width: '100%', marginBottom: 10 }} rows={2} />
//       <textarea value={description1} onChange={(e) => setDescription1(e.target.value)} placeholder="설명 첫 줄" style={{ width: '100%', marginBottom: 10 }} rows={2} />
//       <textarea value={description2} onChange={(e) => setDescription2(e.target.value)} placeholder="설명 두 번째 줄" style={{ width: '100%' }} rows={2} />
//       <button onClick={onClose} style={{ marginTop: 10 }}>닫기</button>
//     </div>
//   );
// };

// export default Tpsection02;







import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tpsection02 = ({ text = "건강한 한끼를 위해서\n제대로된 식사를 제공합니다.", boxes = [], align = 'center', onBoxEdit }) => {
  const defaultBoxes = [
    {
      num: "01",
      title: "식사에 진심인\n사람들을 위해",
      description1: "빠르게 끝내는 식사가 아닌, 영양과 균형을 생각한 식사입니다.",
      description2: "진짜 식사는 준비부터 다릅니다."
    },
    {
      num: "02",
      title: "매일 반복되는 식사,\n지루하지 않게",
      description1: "다양한 식단으로 식사의 즐거움을 더합니다.",
      description2: "매일 다른 메뉴, 매일 새로운 활력."
    },
    {
      num: "03",
      title: "편리함과 건강,\n두 마리 토끼를 동시에",
      description1: "간편함을 원해도 건강은 포기금지. 준비는 우리가 선택은 당신의 몫입니다.",
      description2: "집에서도, 사무실에서도 완벽한 한 끼."
    },
  ];

  const [mainText, setMainText] = useState(text);
  const [textAlign, setTextAlign] = useState(align);
  const [content, setContent] = useState(boxes.length ? boxes : defaultBoxes);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);

  const sectionRef = useRef();

  useLayoutEffect(() => {
    if (editingIndex !== null || editingTitle) return;
    let ctx;
    const setAnimation = () => {
      if (ctx) ctx.revert();
      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 960;
        const titleSelector = ".tpSection02__title";
        const boxSelector = ".subBox";

        gsap.from(titleSelector, {
          y: 100,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleSelector,
            start: isMobile ? "top 90%" : "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.utils.toArray(boxSelector).forEach((box, i) => {
          gsap.from(box, {
            y: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: box,
              start: isMobile ? "top 93%" : "top 75%",
              toggleActions: "play none none reverse"
            },
            delay: i * 0.1
          });
        });
      }, sectionRef);
    };

    setAnimation();
    const handleResize = () => {
      setAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [content, editingIndex, editingTitle]);

  useEffect(() => {
    if (editingIndex === null && !editingTitle) {
      onBoxEdit?.({ text: mainText, boxes: content, align: textAlign });
    }
  }, [mainText, content, textAlign, editingIndex, editingTitle]);

  const handleUpdateBox = (index, updatedData) => {
    const newBoxes = content.map((b, i) => (i === index ? updatedData : b));
    setContent(newBoxes);
  };

  const handleTitleChange = (text, align) => {
    setMainText(text);
    setTextAlign(align);
  };

  return (
    <section className="tpSection02" ref={sectionRef} id="part1">
      <h2
        className="tpSection02__title"
        style={{ textAlign, cursor: 'pointer' }}
        onClick={() => setEditingTitle(true)}
      >
        {mainText.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </h2>

      <div className="tpSection02__mainBox">
        {content.map((box, i) => (
          <div className="subBox" key={i} onClick={() => setEditingIndex(i)}>
            <div className="numText">{box.num}</div>
            <div className="titleText">
              {box.title.split("\n").map((line, idx) => (
                <span key={idx}>{line}<br /></span>
              ))}
            </div>
            <hr />
            <div className="subTitleText">
              <p>{box.description1}</p>
              <p>{box.description2}</p>
            </div>
          </div>
        ))}
      </div>

      {editingTitle && (
        <EditTitleModal
          text={mainText}
          align={textAlign}
          onChange={handleTitleChange}
          onClose={() => setEditingTitle(false)}
        />
      )}

      {editingIndex !== null && (
        <EditBoxModal
          data={content[editingIndex]}
          onChange={(updated) => handleUpdateBox(editingIndex, updated)}
          onClose={() => setEditingIndex(null)}
        />
      )}
    </section>
  );
};

const EditTitleModal = ({ text, align, onChange, onClose }) => {
  const [newText, setNewText] = useState(text);
  const [newAlign, setNewAlign] = useState(align);

  useEffect(() => {
    onChange(newText, newAlign);
  }, [newText, newAlign]);

  useEffect(() => {
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 100, left: 100, background: '#fff', padding: 20, border: '1px solid #ccc', zIndex: 9999 }}>
      <button onClick={onClose} style={{ float: 'right' }}>❌</button>
      <h3>상단 타이틀 수정</h3>
      <textarea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {['left', 'center', 'right'].map((opt) => (
          <button
            key={opt}
            onClick={() => setNewAlign(opt)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              background: newAlign === opt ? '#007bff' : '#eee',
              color: newAlign === opt ? '#fff' : '#000'
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const EditBoxModal = ({ data, onChange, onClose }) => {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    onChange(localData);
  }, [localData]);

  const handleChange = (key, value) => {
    setLocalData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ position: 'fixed', top: 100, left: 100, background: '#fff', padding: 20, border: '1px solid #ccc', zIndex: 9999 }}>
      <button onClick={onClose} style={{ float: 'right' }}>✅ 저장 & 닫기</button>
      <h3>내용 수정</h3>
      <input value={localData.num} onChange={(e) => handleChange("num", e.target.value)} placeholder="번호" style={{ width: '100%', marginBottom: 10 }} />
      <textarea value={localData.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="제목" style={{ width: '100%', marginBottom: 10 }} rows={2} />
      <textarea value={localData.description1} onChange={(e) => handleChange("description1", e.target.value)} placeholder="설명 첫 줄" style={{ width: '100%', marginBottom: 10 }} rows={2} />
      <textarea value={localData.description2} onChange={(e) => handleChange("description2", e.target.value)} placeholder="설명 두 번째 줄" style={{ width: '100%' }} rows={2} />
      <button onClick={onClose} style={{ marginTop: 10 }}>저장하고 닫기</button>
    </div>
  );
};

export default Tpsection02;


