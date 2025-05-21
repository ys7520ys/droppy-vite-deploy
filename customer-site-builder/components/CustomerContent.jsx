// "use client";

// import { useState, useEffect } from "react";
// import TpHeader02 from "@/components/TpHeader/TpHeader02";
// import TpBanner04 from "@/components/TpBanner/TpBanner04";
// import TpSection04 from "@/components/TpSection/TpSection04";
// import TpSection06 from "@/components/TpSection/TpSection06";
// import TpSection07 from "@/components/TpSection/TpSection07";
// import TpSection02 from "@/components/TpSection/TpSection02";
// import TpProjectSlider from "@/components/TpSection/TpProjectSlider";
// import TpSectionPortfolio from "@/components/TpSection/TpSectionPortfolio";
// import TpLogoInfiniteSlider from "@/components/TpSection/TpLogoInfiniteSlider";
// import { AnimatePresence } from "framer-motion";
// import AnimatedPage from "@/components/AnimatedPage";

// // ✅ 렌더링 가능한 컴포넌트 목록
// const componentMap = {
//   배너04: TpBanner04,
//   섹션02: TpSection02,
//   섹션04: TpSection04,
//   섹션06: TpSection06,
//   섹션07: TpSection07,
//   프로젝트슬라이드: TpProjectSlider,
//   섹션포트폴리오: TpSectionPortfolio,
//   배너로고슬라이드: TpLogoInfiniteSlider,
// };

// export default function CustomerContent({ pageData }) {
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPageIndex]);

//   return (
//     <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
//       <TpHeader02
//         menuItems={pageData.pages?.[currentPageIndex]?.menuItems || []}
//         isPreview
//         setCurrentPageIndex={setCurrentPageIndex}
//         currentPageIndex={currentPageIndex}
//       />

//       <AnimatePresence mode="wait">
//         <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
//           {pageData.pages?.[currentPageIndex]?.components?.map((comp, i) => {
//             const Comp = componentMap[comp.type];
//             return Comp ? (
//               <Comp key={i} {...comp} isPreview />
//             ) : (
//               <div key={i} style={{ padding: "80px 0", color: "red" }}>
//                 ❌ 지원하지 않는 컴포넌트: {comp.type}
//               </div>
//             );
//           })}
//         </AnimatedPage>
//       </AnimatePresence>
//     </main>
//   );
// }












// "use client";

// import { useState, useEffect } from "react";
// import TpHeader02 from "@/components/TpHeader/TpHeader02";
// import TpBanner04 from "@/components/TpBanner/TpBanner04";
// import { AnimatePresence } from "framer-motion";
// import AnimatedPage from "@/components/AnimatedPage";

// // ✅ 현재 존재하는 컴포넌트만 등록
// const componentMap = {
//   배너04: TpBanner04,
// };

// export default function CustomerContent({ pageData }) {
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPageIndex]);

//   return (
//     <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
//       <TpHeader02
//         menuItems={pageData.pages?.[currentPageIndex]?.menuItems || []}
//         isPreview
//         setCurrentPageIndex={setCurrentPageIndex}
//         currentPageIndex={currentPageIndex}
//       />

//       <AnimatePresence mode="wait">
//         <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
//           {pageData.pages?.[currentPageIndex]?.components?.map((comp, i) => {
//             const Comp = componentMap[comp.type];
//             return Comp ? (
//               <Comp key={i} {...comp} isPreview />
//             ) : null; // 지원되지 않는 컴포넌트는 렌더링하지 않음
//           })}
//         </AnimatedPage>
//       </AnimatePresence>
//     </main>
//   );
// }







// "use client";

// import { useState, useEffect } from "react";
// import TpHeader02 from "@/components/TpHeader/TpHeader02";
// import TpBanner04 from "@/components/TpBanner/TpBanner04";
// import { AnimatePresence } from "framer-motion";
// import AnimatedPage from "@/components/AnimatedPage";

// // ✅ "헤더02"도 등록
// const componentMap = {
//   헤더02: TpHeader02,
//   배너04: TpBanner04,
// };

// export default function CustomerContent({ pageData }) {
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPageIndex]);

//   return (
//     <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
//       {/* 🔥 헤더02도 컴포넌트에서 처리할 수 있도록 변경 */}
//       <AnimatePresence mode="wait">
//         <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
//           {pageData.pages?.[currentPageIndex]?.components?.map((comp, i) => {
//             const Comp = componentMap[comp.type];
//             return Comp ? (
//               <Comp
//                 key={i}
//                 {...comp}
//                 isPreview
//                 setCurrentPageIndex={setCurrentPageIndex}
//                 currentPageIndex={currentPageIndex}
//               />
//             ) : null;
//           })}
//         </AnimatedPage>
//       </AnimatePresence>
//     </main>
//   );
// }








"use client";

import { useState, useEffect } from "react";
import TpHeader02 from "@/components/TpHeader/TpHeader02";
import TpBanner04 from "@/components/TpBanner/TpBanner04";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "@/components/AnimatedPage";

// ✅ 등록된 컴포넌트 맵
const componentMap = {
  헤더02: TpHeader02,
  배너04: TpBanner04,
};

export default function CustomerContent({ pageData }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // ✅ 페이지 전환 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPageIndex]);

  // ✅ pages 배열이 없거나 비었을 때 처리
  if (!pageData?.pages || pageData.pages.length === 0) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        ❌ 페이지 데이터가 없습니다
      </div>
    );
  }

  const currentPage = pageData.pages[currentPageIndex];

  return (
    <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
      <AnimatePresence mode="wait">
        <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
          {currentPage.components?.map((comp, i) => {
            const Comp = componentMap[comp.type];
            return Comp ? (
              <Comp
                key={i}
                {...comp}
                isPreview
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
              />
            ) : null;
          })}
        </AnimatedPage>
      </AnimatePresence>
    </main>
  );
}
