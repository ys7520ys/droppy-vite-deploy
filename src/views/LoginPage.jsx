// import {React, useState, useEffect} from "react";
// import { Helmet } from "react-helmet-async";
// import AboutBanner from "../components/About/AboutBanner";
// import CountingNum from "../components/About/AboutNumber";
// import Swiper from "../components/About/AboutSwiper";
// import NaverMap from "../components/About/AboutMap";
// import LoginSection01 from "../components/TpSection/LoginSection01";
// import SignUpSection01 from "../components/TpSection/SignUp";
// import NaverLogin from "../components/TpSection/LoginSection02";

// const LoginPage = () => {

//   const [announceText, setAnnounceText] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // setAnnounceText("ABOUT 페이지로 이동하였습니다, CJ ENM이 이룬 성과들과 협약된 프로그램들을 소개하는 페이지입니다.");
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <html lang="ko" />
//         <title>ABOUT US | CJ ENM CP License</title>
//         <meta name="description" content="CJ ENM이 지금까지 달려온 성과들을 같이 확인해보아요." />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/about" />
//       </Helmet>
//       <h1 className="sr-only">
//         CJ ENM | ABOUT US 페이지
//       </h1>
//       <div aria-live="polite" className="sr-only">
//         {announceText}
//       </div>
//       <LoginSection01 />
//       <SignUpSection01 />
//       <NaverLogin />
//     </>
//   )
// }

// export default LoginPage;

















// ✅ LoginPage.jsx (Firebase 이메일/비밀번호 로그인 + setUser 반영)
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import NaverLogin from "../components/TpSection/LoginSection02";


// ✅ setUser를 props로 받음
const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser(user); // ✅ 로그인한 유저 상태 저장
      alert("로그인 성공!");
      navigate("/productPage03"); // ✅ 로그인 후 페이지 이동
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUser(user); // ✅ 구글 로그인 유저 상태 저장
      alert("Google 계정으로 로그인되었습니다!");
      navigate("/productPage03"); // ✅ 이동
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      alert("구글 로그인에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "100px 50px", border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#000", color: "white" }}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{ width: "100%", padding: 10, marginTop: 12, background: "#4285F4", color: "#fff" }}
        >
          Google 계정으로 로그인
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {/* <NaverLogin /> */}
    </div>
  );
};

export default LoginPage;
