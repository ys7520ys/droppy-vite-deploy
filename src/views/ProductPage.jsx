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
import Tpsection08 from "../components/TpSection/TpSection08";

const ProductPage01 = () => {

  // const [announceText, setAnnounceText] = useState("");
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAnnounceText("");
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, []);

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
        {/* {announceText} */}
      </div>
      {/* <TpBanner01 /> */}
      {/* <TpBanner02 /> */}
      {/* <TpBanner03 /> */}
      {/* <TpBanner04 /> */}
      {/* <Tpsection02 /> */}
      {/* <Tpsection03 /> */}
      {/* <Tpsection04 />
      <Tpsection07 />
      <Tpsection05 />
      <Tpsection06 /> */}
      <Tpsection08 />
      {/* <StickySection /> */}
      {/* <StickySection /> */}
    </>
  )
}

export default ProductPage01;