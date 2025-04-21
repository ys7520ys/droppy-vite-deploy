import { React, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DetailReady from "../components/Detail/DetailReady";
import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const { pathname } = useLocation(); 
  useEffect(() => {
      window.scrollTo(0, 0); 
  }, [pathname]); 

  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("DETAIL 페이지로 이동하였습니다. CJ ENM 상세페이지는 지금 준비중입니다. 불편을 끼쳐서 죄송합니다.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);
    
  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>CONTACT US | CJ ENM CP License</title>
        <meta name="description" content="CJ ENM 상세 페이지입니다." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/contactUs" />
      </Helmet>
      <h1 className="sr-only">
        CJ ENM | DETAIL 페이지
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      <DetailReady/>
    </>
  )
}

export default DetailPage;