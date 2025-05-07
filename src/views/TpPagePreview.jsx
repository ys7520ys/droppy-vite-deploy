import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import TpHeaderUser from "../layout/TpHeader/TpHeaderUser";
import TpBanner04 from "../components/TpBanner/TpBanner04";
import TpBannerSwiper from "../components/TpBanner/TpBannerSwiper";
import TpLogoInfiniteSlider from "../components/TpSection/TpLogoInfiniteSlider";
import Tpsection04 from "../components/TpSection/TpSection04";
import Tpsection02 from "../components/TpSection/TpSection02";
import Tpsection07 from "../components/TpSection/TpSection07";
import TpSectionPortfolio from "../components/TpSection/TpSectionPortfolio";
import TpProjectSlider from "../components/TpSection/TpProjectSlider";
import TpTeamStructure from "../components/TpSection/TpTeamStructure";
import TpEventGrid from "../components/TpSection/TpEventGrid";
import TpSection06 from "../components/TpSection/TpSection06";

const componentMap = {
  배너04: TpBanner04,
  배너Swiper: TpBannerSwiper,
  배너로고슬라이드: TpLogoInfiniteSlider,
  섹션02: Tpsection02,
  섹션04: Tpsection04,
  섹션06: TpSection06,
  섹션07: Tpsection07,
  섹션포트폴리오: TpSectionPortfolio,
  프로젝트슬라이드: TpProjectSlider,
  팀구성: TpTeamStructure,
  행사그리드: TpEventGrid,
};

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

const TpPagePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pages = location.state?.pages || [];
  const headerType = location.state?.headerType || "헤더02";
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(queryParams.get("page"), 10);
    if (!isNaN(pageFromQuery) && pageFromQuery >= 0) {
      setCurrentPageIndex(pageFromQuery);
    }
  }, [location.search]);

  const isValidPage = currentPageIndex >= 0 && currentPageIndex < pages.length;

  // ✅ fallback 메뉴도 항상 보장
  const menuItems = pages[currentPageIndex]?.menuItems ?? pages[0]?.menuItems ?? [];

  const currentComponents = isValidPage
    ? pages[currentPageIndex]?.components.filter((c) => c.type !== "헤더02") || []
    : [];

  return (
    <div style={{ background: "#222222", minHeight: "100vh", paddingTop: "80px" }}>
      {/* 우측 상단 고정 버튼 */}
      <button
        onClick={() => navigate("/productPage03")}
        style={{
          position: "fixed",
          top: 30,
          right: 30,
          zIndex: 20000,
          padding: "12px 28px",
          borderRadius: "12px",
          background: "#111",
          color: "#fff",
          border: "2px solid #fff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        제작페이지로 돌아가기
      </button>

      {/* 상단 고정된 헤더 */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
        <TpHeaderUser
          headerType={headerType}
          isPreview={true}
          pages={pages}
          menuItems={menuItems}
          setCurrentPageIndex={setCurrentPageIndex}
          currentPageIndex={currentPageIndex}
        />
      </div>

      {/* 본문 영역 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageIndex}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {isValidPage ? (
            currentComponents.map((comp, index) => {
              const Comp = componentMap[comp.type];
              if (!Comp) return null;
              return (
                <Comp
                  key={comp.id ?? index}
                  {...comp}
                  isPreview={true}
                  pages={pages}
                />
              );
            })
          ) : (
            <div
              style={{
                padding: "200px 0",
                color: "#ccc",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              ⚠ 존재하지 않는 페이지입니다.
              <br />
              상단 메뉴에서 다른 항목을 선택해주세요.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TpPagePreview;
