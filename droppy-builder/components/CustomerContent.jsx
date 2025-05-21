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






"use client";

import { useState, useEffect } from "react";
import TpHeader02 from "@/components/TpHeader/TpHeader02";
import TpBanner04 from "@/components/TpBanner/TpBanner04";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "@/components/AnimatedPage";

// ✅ 등록된 컴포넌트만 구성
const componentMap = {
  헤더02: TpHeader02,
  배너04: TpBanner04,
};

export default function CustomerContent({ pageData }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPageIndex]);

  const currentPage = pageData?.pages?.[currentPageIndex];

  if (!currentPage || !Array.isArray(currentPage.components)) {
    return (
      <main style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        ❌ 페이지 구성 요소가 없습니다
      </main>
    );
  }

  return (
    <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
      <AnimatePresence mode="wait">
        <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
          {currentPage.components.map((comp, i) => {
            const Comp = componentMap[comp.type];
            return Comp ? (
              <Comp
                key={i}
                {...comp}
                isPreview
                setCurrentPageIndex={setCurrentPageIndex}
                currentPageIndex={currentPageIndex}
              />
            ) : (
              <div
                key={i}
                style={{
                  padding: "60px",
                  textAlign: "center",
                  background: "#111",
                }}
              >
                ⚠️ 알 수 없는 컴포넌트: <strong>{comp.type}</strong>
              </div>
            );
          })}
        </AnimatedPage>
      </AnimatePresence>
    </main>
  );
}
