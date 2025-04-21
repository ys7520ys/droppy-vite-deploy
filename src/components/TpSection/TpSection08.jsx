// import React, { useEffect,useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { Link } from "react-router-dom";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Tpsection08() {
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     },[]);

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
//                     gsap.from(".tpSection08__titleArea",{
//                         y: 100,
//                         opacity: 0,
//                         duration: 0.7,  
//                         ease: "power2.out",
//                         scrollTrigger: {
//                             trigger: ".tpSection08__titleArea",
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
//       className="tpSection08"
//       ref={sectionRef}
//     >
//         <div className="tpSection08__top">
//             <div className="imgBox"></div>
//             <div className="textBox">
//                 <div className="title">
//                     식사에 진심인<br/>사람들을 위해서
//                 </div>
//                 <div className="subTitle">
//                     진짜 식사는 존재합니다.
//                 </div>
//                 <p className="subInfoText">
//                     우리는 단순히 허기를 채우기 위해 급하게 끝내는 식사가 아니라, 
//                     몸에 꼭 필요한 영양소를 고루 갖추고 균형 있게 구성된 식사를 추구합니다. 
//                     준비는 건강한 삶의 시작이라고 믿기에, 식사 하나에도 정성과 고민을 담았습니다.
//                     우리는 단순히 허기를 채우기 위해 급하게 끝내는 식사가 아니라, 
//                     몸에 꼭 필요한 영양소를 고루 갖추고 균형 있게 구성된 식사를 추구합니다. 
//                     준비는 건강한 삶의 시작이라고 믿기에, 식사 하나에도 정성과 고민을 담았습니다.
//                     우리는 단순히 허기를 채우기 위해 급하게 끝내는 식사가 아니라, 
//                     몸에 꼭 필요한 영양소를 고루 갖추고 균형 있게 구성된 식사를 추구합니다. 
//                     준비는 건강한 삶의 시작이라고 믿기에, 식사 하나에도 정성과 고민을 담았습니다.
//                 </p>
//             </div>
//         </div>
//         <div className="tpSection08__middle">
//             <div className="textBox">
//                 <h3 className="title">식사의 의미를 다시 생각합니다.</h3>
//                 <p className="infoText">
//                     우리는 매일 무언가를 먹습니다. 바쁘게 하루를 보내며 간편하게 한 끼를 해결하거나, 누군가와 함께하는 따뜻한 식사 시간을 갖기도 하죠. 하지만 식사는 단순한 생존을 위한 행위만이 아닙니다.
//                     진심을 담은 한 끼는, 몸을 위한 영양을 넘어 마음까지 어루만지는 힘을 가지고 있습니다. 어떤 재료로, 어떤 방식으로 준비되었는지가 곧 그 식사의 태도를 말해줍니다.
//                     그래서 우리는 생각합니다. 좋은 식사는 무엇인가? 단지 고급 재료나 화려한 플레이팅이 아니라, 먹는 사람을 위한 정성과 배려가 담겨있는가가 더 중요하다고 말이죠.
//                     건강한 재료를 엄선하고, 조리과정 하나하나에 의미를 담습니다. 음식이 놓이는 그릇부터 공간의 분위기까지, 모든 것이 조화를 이루는 한 끼를 만들어내고자 합니다.
//                     오늘 당신은 어떤 식사를 하셨나요? 그리고 그 식사는 당신의 하루에 어떤 의미였나요? 우리의 식탁이, 당신의 일상에 작은 울림이 되길 바랍니다.
//                 </p>
//                 <br/>
//                 <p className="infoText">
//                     건강한 재료를 엄선하고, 조리과정 하나하나에 의미를 담습니다. 음식이 놓이는 그릇부터 공간의 분위기까지, 모든 것이 조화를 이루는 한 끼를 만들어내고자 합니다.
//                     오늘 당신은 어떤 식사를 하셨나요? 그리고 그 식사는 당신의 하루에 어떤 의미였나요? 우리의 식탁이, 당신의 일상에 작은 울림이 되길 바랍니다.
//                 </p>
//             </div>
//         </div>
//     </section>
//   );
// }

// export default Tpsection08;


























// Tpsection.jsx
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 컴포넌트 목록 정의
const COMPONENTS = [
  { type: "text", label: "텍스트 컴포넌트" },
  { type: "button", label: "버튼 컴포넌트" },
];

// 드래그 가능한 아이템
const DraggableItem = ({ item }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "COMPONENT",
    item,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        padding: "10px",
        marginBottom: "8px",
        background: "#eee",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {item.label}
    </div>
  );
};

// 드롭 가능한 영역
const DropCanvas = ({ onDrop, children }) => {
  const [, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => onDrop(item),
  }));

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        padding: "20px",
        background: "#fafafa",
        border: "2px dashed #ccc",
        minHeight: "400px",
      }}
    >
      {children.length === 0 ? <p>컴포넌트를 이곳에 드래그하세요</p> : children}
    </div>
  );
};

// 렌더링되는 컴포넌트
const RenderComponent = ({ type }) => {
  switch (type) {
    case "text":
      return <p style={{ padding: "10px" }}>✨ 사용자 정의 텍스트</p>;
    case "button":
      return <button style={{ margin: "10px" }}>클릭 버튼</button>;
    default:
      return null;
  }
};

// 최종 메인 컴포넌트
const Tpsection08 = () => {
  const [components, setComponents] = useState([]);

  const handleDrop = (item) => {
    setComponents((prev) => [...prev, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px", padding: "300px" }}>
        <div style={{ width: "200px" }}>
          <h3>📦 컴포넌트 목록</h3>
          {COMPONENTS.map((comp, idx) => (
            <DraggableItem key={idx} item={comp} />
          ))}
        </div>

        <DropCanvas onDrop={handleDrop}>
          {components.map((c, i) => (
            <RenderComponent key={i} type={c.type} />
          ))}
        </DropCanvas>
      </div>
    </DndProvider>
  );
};

export default Tpsection08;
