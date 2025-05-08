import React from "react";
import TpHeader01 from "./TpHeader01";
import TpHeader02 from "./TpHeader02";
import TpHeader03 from "./TpHeader03";
import TpHeader04 from "./TpHeader04";

const TpHeaderUser = ({ headerType = "헤더02", navItems = [], menuItems, setMenuItems, pages, isPreview, setCurrentPageIndex, currentPageIndex, ...props }) => {
  if (headerType === "헤더01") return <TpHeader01 navItems={navItems} {...props} />;
  if (headerType === "헤더03") return (
    <TpHeader03
      menuItems={menuItems}
      setMenuItems={setMenuItems}
      pages={pages}
      isPreview={isPreview}
      setCurrentPageIndex={setCurrentPageIndex}
      currentPageIndex={currentPageIndex}
      {...props}
    />
  );
  if (headerType === "헤더04") return <TpHeader04 navItems={navItems} {...props} />;
  // 기본값은 TpHeader02
  return <TpHeader02 navItems={navItems} menuItems={menuItems} setMenuItems={setMenuItems} pages={pages} isPreview={isPreview} setCurrentPageIndex={setCurrentPageIndex} currentPageIndex={currentPageIndex} {...props} />;
};

export default TpHeaderUser; 