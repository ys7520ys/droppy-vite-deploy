import {React, useState, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import AboutBanner from "../components/About/AboutBanner";
import CountingNum from "../components/About/AboutNumber";
import Swiper from "../components/About/AboutSwiper";
import NaverMap from "../components/About/AboutMap";

const AboutPage = () => {

  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("ABOUT 페이지로 이동하였습니다, CJ ENM이 이룬 성과들과 협약된 프로그램들을 소개하는 페이지입니다.");
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
        CJ ENM | ABOUT US 페이지
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      <AboutBanner />
      <CountingNum />
      <Swiper />
    </>
  )
}

export default AboutPage;