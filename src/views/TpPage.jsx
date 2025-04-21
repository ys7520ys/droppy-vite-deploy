import {React, useState, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import TpBanner01 from "../components/TpBanner/TpBanner01";
import TpBanner02 from "../components/TpBanner/TpBanner02";
import TpBanner03 from "../components/TpBanner/TpBanner03";
import TpBanner04 from "../components/TpBanner/TpBanner04";
import StickySection from "../components/TpSection/TpSection01";
import Tpsection02 from "../components/TpSection/TpSection02";
import Tpsection03 from "../components/TpSection/TpSection03";
import Tpsection04 from "../components/TpSection/TpSection04";
import Tpsection05 from "../components/TpSection/TpSection05";
import Tpsection06 from "../components/TpSection/TpSection06";
import FaqAccordion from "../components/TpSection/TpSection06";
import Tpsection07 from "../components/TpSection/TpSection07";
import NaverMap from "../components/About/AboutMap";

const TpPage = () => {

//  useEffect(() => {
//     const loadScript = (src) =>
//       new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = true;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.body.appendChild(script);
//       });

//     const loadAll = async () => {
//       await loadScript(`${process.env.PUBLIC_URL}/jquery-3.4.1.min.js`);
//       await loadScript(`${process.env.PUBLIC_URL}/jquery.scrollTo.min.js`);
//       await loadScript(`${process.env.PUBLIC_URL}/smoothScroll.js`);
//     };

//     loadAll();
//   });
  




useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const targetId = hash.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // 고정 헤더 높이만큼 오프셋 조절
      const headerOffset = 80; // 예: 80px짜리 고정 헤더
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      // 부드럽게 스크롤 이동
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // URL 해시 제거 (선택)
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 1000);
    }
  }
}, []); // 최초 마운트 시 1회 실행







    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      }, []);

  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>ABOUT US | CJ ENM CP License</title>
        <meta name="description" content="CJ ENM이 지금까지 달려온 성과들을 같이 확인해보아요." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/about" />
      </Helmet>
      <h1 className="sr-only">
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      {/* <TpBanner01 /> */}
      <TpBanner02 />
      {/* <TpBanner03 /> */}
      {/* <TpBanner04 /> */}
      <Tpsection02 />
      {/* <Tpsection03 /> */}
      <Tpsection04 />
      <Tpsection07 />
      {/* <Tpsection05 /> */}
      <Tpsection06 />
      <NaverMap />
      {/* <StickySection /> */}
      {/* <StickySection /> */}
    </>
  )
}

export default TpPage;