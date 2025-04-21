import {React, useState, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import HomeBanner from "../components/Home/HomeBanner.jsx";
import HomeMainLicense from "../components/Home/HomeMainLicense.jsx";
import HomeNews from "../components/Home/HomeNews.jsx";



import NaverMap from "../components/About/AboutMap.jsx";
import VideoBanner from "../components/About/AboutVideoBanner.jsx";

const HomePage = () => {

  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("HOME 페이지로 이동하였습니다, CJ ENM 메인 페이지입니다.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>CJ ENM CP License</title>
        <meta name="description" content="CJ ENM의 다양한 IP 라이센스를 활용하여 글로벌 콘텐츠를 확장합니다." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/" />
      </Helmet>
      <h1 className="sr-only">
        CJ ENM | HOME 페이지
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      {/* <HomeBanner /> */}
      {/* <HomeMainLicense /> */}
      {/* <HomeNews /> */}
      {/* <NaverMap /> */}
      {/* <VideoBanner /> */}
    </>
  )
}

export default HomePage;