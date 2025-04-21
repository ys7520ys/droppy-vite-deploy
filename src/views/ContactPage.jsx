import {React, useEffect, useState} from "react";
import { Helmet } from "react-helmet-async";
import ContactBanner from "../components/Contact/ContactBanner";
import ContactForm from "../components/Contact/ContactForm";
import Main from "../layout/Main";

const ContactPage = () => {

  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("CONTACT 페이지로 이동하였습니다, CJ ENM에 관한 문의를 요청할 수 있는 페이지입니다. 하단에 문의자 정보 및 문의내용을 입력해주세요.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>CONTACT US | CJ ENM CP License</title>
        <meta name="description" content="CJ ENM에 대한 문의와 건의를 통해서 궁금증을 해결하세요." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/contactUs" />
      </Helmet>
      <h1 className="sr-only">
        CJ ENM | CONTACT US 페이지
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      <ContactBanner />
      <ContactForm />
    </>
  )
}

export default ContactPage;