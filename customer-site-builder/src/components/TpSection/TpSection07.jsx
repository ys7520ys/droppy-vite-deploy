// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const progressData = [
//   { percentage: 88, label: "고객 만족도" },
//   { percentage: 75, label: "서비스 도입률" },
//   { percentage: 63, label: "재구매율" },
// ];

// const Tpsection07 = () => {
//   return (
//     <div className="Tpsection07" id="part3">
//       <div className="Tpsection07__titleBox">
//         <div className="title">데이터로 증명하는 고객 만족도</div>
//         <div className="subTitle">
//           고객의 선택은 우연이 아닙니다. 수치로 확인하세요.
//         </div>
//       </div>
//       <div className="progress-wrapper">
//         {progressData.map((item, index) => (
//           <ProgressItem
//             key={index}
//             percentage={item.percentage}
//             label={item.label}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProgressItem = ({ percentage, label }) => {
//   const size = 220;
//   const stroke = 25;
//   const radius = (size - stroke) / 2;
//   const circumference = 2 * Math.PI * radius;

//   const chartRef = useRef(null);
//   const circleRef = useRef(null);
//   const numberRef = useRef(null);

//   useEffect(() => {
//     const el = chartRef.current;
//     if (!el) return;

//     const ctx = gsap.context(() => {
//       gsap.set(el, { y: 100, opacity: 0 });

//       const tl = gsap.timeline({ paused: true });

//       tl.to(el, {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//       });

//       tl.to(
//         numberRef.current,
//         {
//           innerText: percentage,
//           duration: 1.4,
//           ease: "power1.out",
//           snap: "innerText",
//           onUpdate: () => {
//             if (!numberRef.current) return;

//             const currentValue = parseFloat(
//               numberRef.current.innerText.replace("%", "")
//             );
//             if (!isNaN(currentValue)) {
//               numberRef.current.innerText = Math.round(currentValue) + "%";
//             }
//           },
//         },
//         "<"
//       );

//       tl.fromTo(
//         circleRef.current,
//         { strokeDashoffset: circumference },
//         {
//           strokeDashoffset:
//             circumference - (percentage / 100) * circumference,
//           duration: 1.4,
//           ease: "power2.out",
//         },
//         "<"
//       );

//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 90%",
//         end: "bottom 20%",
//         onEnter: () => tl.play(),
//         onLeave: () => tl.reverse(),
//         onEnterBack: () => tl.play(),
//         onLeaveBack: () => tl.reverse(),
//       });
//     }, chartRef);

//     return () => ctx.revert();
//   }, [percentage, circumference]);

//   return (
//     <div 
//       ref={chartRef} 
//       className="circular-progress"
//       title="섹션07"  
//     >
//       <svg viewBox="0 0 220 220" className="circular-progress__svg">
//         <circle
//           className="circular-progress__bg"
//           strokeWidth={stroke}
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//         />
//         <circle
//           ref={circleRef}
//           className="circular-progress__bar"
//           strokeWidth={stroke}
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//           strokeDasharray={circumference}
//           strokeDashoffset={circumference}
//         />
//       </svg>
//       <div className="circular-progress__text">
//         <strong ref={numberRef}>0%</strong>
//         <div className="circular-progress__label">{label}</div>
//       </div>
//     </div>
//   );
// };

// export default Tpsection07;





// ✅ Tpsection07 - 수정 가능한 형태로 리팩터링 (제목 실시간 반영 + 데이터도 실시간 반영)
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tpsection07 = ({ data = [], titleText = "데이터로 증명하는 고객 만족도", subTitleText = "고객의 선택은 우연이 아닙니다. 수치로 확인하세요.", onUpdate }) => {
  const defaultData = [
    { percentage: 88, label: "고객 만족도" },
    { percentage: 75, label: "서비스 도입률" },
    { percentage: 63, label: "재구매율" },
  ];

  const [progressData, setProgressData] = useState(data.length ? data : defaultData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [mainTitle, setMainTitle] = useState(titleText);
  const [subTitle, setSubTitle] = useState(subTitleText);

  const handleUpdateItem = (index, updatedItem) => {
    const newData = progressData.map((item, i) => (i === index ? updatedItem : item));
    setProgressData(newData);
    onUpdate?.({ data: newData, titleText: mainTitle, subTitleText: subTitle });
  };

  const handleTitleSave = () => {
    setEditingTitle(false);
    onUpdate?.({ data: progressData, titleText: mainTitle, subTitleText: subTitle });
  };

  return (
    <div className="Tpsection07" id="part3">
      <div className="Tpsection07__titleBox" onClick={() => setEditingTitle(true)} style={{ cursor: "pointer" }}>
        <div className="title">{mainTitle}</div>
        <div className="subTitle">{subTitle}</div>
      </div>

      <div className="progress-wrapper">
        {progressData.map((item, index) => (
          <div key={index} onClick={() => setEditingIndex(index)}>
            <ProgressItem percentage={item.percentage} label={item.label} />
          </div>
        ))}
      </div>

      {editingIndex !== null && (
        <EditModal
          data={progressData[editingIndex]}
          onChange={(updated) => handleUpdateItem(editingIndex, updated)}
          onClose={() => setEditingIndex(null)}
        />
      )}

      {editingTitle && (
        <EditTitleModal
          title={mainTitle}
          subTitle={subTitle}
          setTitle={setMainTitle}
          setSubTitle={setSubTitle}
          onSave={handleTitleSave}
          onClose={() => setEditingTitle(false)}
        />
      )}
    </div>
  );
};

const ProgressItem = ({ percentage, label }) => {
  const size = 220;
  const stroke = 25;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const chartRef = useRef(null);
  const circleRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { y: 100, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(el, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });

      tl.to(
        numberRef.current,
        {
          innerText: percentage,
          duration: 1.4,
          ease: "power1.out",
          snap: "innerText",
          onUpdate: () => {
            if (!numberRef.current) return;
            const currentValue = parseFloat(numberRef.current.innerText.replace("%", ""));
            if (!isNaN(currentValue)) {
              numberRef.current.innerText = Math.round(currentValue) + "%";
            }
          },
        },
        "<"
      );

      tl.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference - (percentage / 100) * circumference,
          duration: 1.4,
          ease: "power2.out",
        },
        "<"
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        end: "bottom 20%",
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    }, chartRef);

    return () => ctx.revert();
  }, [percentage, circumference]);

  return (
    <div ref={chartRef} className="circular-progress" title="섹션07">
      <svg viewBox="0 0 220 220" className="circular-progress__svg">
        <circle className="circular-progress__bg" strokeWidth={stroke} r={radius} cx={size / 2} cy={size / 2} />
        <circle
          ref={circleRef}
          className="circular-progress__bar"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <div className="circular-progress__text">
        <strong ref={numberRef}>{percentage}%</strong>
        <div className="circular-progress__label">{label}</div>
      </div>
    </div>
  );
};

const EditModal = ({ data, onChange, onClose }) => {
  const [percentage, setPercentage] = useState(data.percentage);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    onChange({ percentage, label });
  }, [percentage, label]);

  return (
    <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
      <button onClick={onClose} style={{ float: "right" }}>❌</button>
      <h3>데이터 수정</h3>
      <input
        type="text"
        value={percentage}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setPercentage(Number(value));
        }}
        placeholder="퍼센트"
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="라벨"
        style={{ width: "100%" }}
      />
      <button onClick={onClose} style={{ marginTop: 10 }}>닫기</button>
    </div>
  );
};

const EditTitleModal = ({ title, subTitle, setTitle, setSubTitle, onSave, onClose }) => {
  return (
    <div style={{ position: "fixed", top: 150, left: 150, background: "#fff", padding: 20, zIndex: 9999, border: "1px solid #ccc" }}>
      <button onClick={onClose} style={{ float: "right" }}>❌</button>
      <h3>타이틀 수정</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="서브제목"
        style={{ width: "100%" }}
      />
      <button onClick={onSave} style={{ marginTop: 10 }}>저장</button>
    </div>
  );
};

export default Tpsection07;

