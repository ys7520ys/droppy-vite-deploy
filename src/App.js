// import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
// import { HelmetProvider } from "react-helmet-async";
// import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
// import Aos from "aos";
// import gsap from "gsap";
// // import ScrollToTop from "./scrollTo"; // 만든 컴포넌트 경로

// import "aos/dist/aos.css";
// import Header from "../src/layout/Header";
// import TpHeader01 from "./layout/TpHeader/TpHeader01";
// import TpHeader02 from "./layout/TpHeader/TpHeader02";
// import TpHeader03 from "./layout/TpHeader/TpHeader03";
// import TpHeader04 from "./layout/TpHeader/TpHeader04";

// import Footer from "../src/layout/Footer";
// import TpFooter01 from "./layout/TpFooter/TpFooter01";

// import AnimateRoutes from "./AnimatedRoutes";

// import { homeMainLicense } from "./constants/data/home";
// import { homeNews } from "./constants/data/home";
// import { assetGridCard } from "../src/constants/data/asset";
// import { aboutSwiper } from "./constants/data/about";
// import { newsGridCard } from "./constants/data/news";
// // import SmoothScrollHandler from "./smoothScrollReact";







// // 이미지의 값을 바로 로드한다. (원래 각 컴포넌트에서 로둥하여 구성하였지만, 시작 페이지에서 구성)
// const preloadImages = (imageList) => {
//   imageList.forEach((src) => {
//     const img = new Image();
//     img.src = src;
//   })
// }

// const App = () => {
//   // useEffect(() => {
//   //   window.scrollTo({ top: 0, behavior: "auto" });
//   // });


//       // function ScrollToTopOnRouteChange() {
//       //   const location = useLocation();
      
//       //   useEffect(() => {
//       //     window.scrollTo({ top: 0, behavior: "auto" }); // 또는 "smooth"
//       //   }, [location.pathname]);
      
//       //   return null;
//       // }


//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `${process.env.PUBLIC_URL}/smoothScroll.js`;
//     script.async = true;
//     document.body.appendChild(script);
//   },[]);

  
// // useEffect(() => {
// //   const loadScript = (src) =>
// //     new Promise((resolve, reject) => {
// //       const script = document.createElement("script");
// //       script.src = src;
// //       script.async = true;
// //       script.onload = resolve;
// //       script.onerror = reject;
// //       document.body.appendChild(script);
// //     });

// //   const loadAll = async () => {
// //     if (!window.jQuery) {
// //       await loadScript(`${process.env.PUBLIC_URL}/jquery-3.4.1.min.js`);
// //     }
// //     if (!window.$.scrollTo) {
// //       await loadScript(`${process.env.PUBLIC_URL}/jquery.scrollTo.min.js`);
// //     }
// //     await loadScript(`${process.env.PUBLIC_URL}/smoothScroll.js`);
// //   };

// //   loadAll();
// // }, []); // ❗ 반드시 의존성 배열 `[]` 추가

//   const containerRef = useRef();

//   useLayoutEffect(() => {
//     const el = containerRef.current?.querySelector(".tpSection08");
//     if (el) {
//       gsap.to(el, {
//         x: 100,
//         duration: 1,
//         onUpdate: () => {
//           if (el.innerText) console.log(el.innerText);
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const allImages = [
//       ...homeMainLicense.mainLicense_img.map((item) => item.img),
//       ...homeNews.news_img.map((item) => item.img),

//       ...newsGridCard.gridCard_img.map((item) => item.img),

//       ...aboutSwiper.swiper_img.first.map((item) => item.img),
//       ...aboutSwiper.swiper_img.second.map((item) => item.img),
//       ...aboutSwiper.swiper_img.third.map((item) => item.img),

//       ...assetGridCard.gridCard_img.tv.map((item) => item.img),
//       ...assetGridCard.gridCard_img.ani.map((item) => item.img),
//     ];
//     preloadImages(allImages);
//   },[]);

//   useEffect(() => {
//     Aos.init({
//         duration: 600, 
//         once: false, 
//     });
//     Aos.refresh();
//   });

//   return (
//     <HelmetProvider
//     > 
//       {/* 동적으로 helmet의 값을 변경하기 위해서 <HelmetProvider>로 감싸서 구성하였다. */}
//       <Router>
//       {/* <SmoothScrollHandler /> */}
//       {/* <TpHeader01 /> */}
//         {/* <ScrollToTop /> */}
//         <TpHeader02 />
//         {/* <TpHeader03 /> */}
//         {/* <TpHeader04 /> */}
//         <AnimateRoutes />
//         {/* <Footer /> */}
//         <TpFooter01 />
//       </Router>
//     </HelmetProvider>
//   )
// }

// export default App;






















import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import Aos from "aos";
import gsap from "gsap";
import "aos/dist/aos.css";

import TpHeader02 from "./layout/TpHeader/TpHeader02";
import TpFooter01 from "./layout/TpFooter/TpFooter01";
import AnimateRoutes from "./AnimatedRoutes";

import { homeMainLicense } from "./constants/data/home";
import { homeNews } from "./constants/data/home";
import { assetGridCard } from "../src/constants/data/asset";
import { aboutSwiper } from "./constants/data/about";
import { newsGridCard } from "./constants/data/news";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // ✅ Firestore import 추가

const preloadImages = (imageList) => {
  imageList.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const App = () => {
  const [user, setUser] = useState(null); // ✅ 유저 상태
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태
  const containerRef = useRef();

  // ✅ Firebase 인증 + Firestore에서 isAdmin 불러오기
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              isAdmin: userData.isAdmin ?? false,
            });
          } else {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              isAdmin: false,
            });
          }
        } catch (err) {
          console.error("❌ Firestore에서 관리자 권한 가져오기 실패:", err);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            isAdmin: false,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ 로깅용 콘솔
  useEffect(() => {
    console.log("🔥 user 상태:", user);
    console.log("⌛ loading 상태:", loading);
  }, [user, loading]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/smoothScroll.js`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current?.querySelector(".tpSection08");
    if (el) {
      gsap.to(el, {
        x: 100,
        duration: 1,
        onUpdate: () => {
          if (el.innerText) console.log(el.innerText);
        },
      });
    }
  }, []);

  // ✅ 네이버 로그인 정보가 남아 있다면 복구
  useEffect(() => {
    const savedUser = localStorage.getItem("naverUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ 이미지 프리로드
  useEffect(() => {
    const allImages = [
      ...homeMainLicense.mainLicense_img.map((item) => item.img),
      ...homeNews.news_img.map((item) => item.img),
      ...newsGridCard.gridCard_img.map((item) => item.img),
      ...aboutSwiper.swiper_img.first.map((item) => item.img),
      ...aboutSwiper.swiper_img.second.map((item) => item.img),
      ...aboutSwiper.swiper_img.third.map((item) => item.img),
      ...assetGridCard.gridCard_img.tv.map((item) => item.img),
      ...assetGridCard.gridCard_img.ani.map((item) => item.img),
    ];
    preloadImages(allImages);
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 600,
      once: false,
    });
    Aos.refresh();
  });

  return (
    <HelmetProvider>
      <Router>
        <TpHeader02 user={user} />
        <AnimateRoutes user={user} loading={loading} setUser={setUser} />
        <TpFooter01 />
      </Router>
    </HelmetProvider>
  );
};

export default App;















// ✅ App.js (로그인 상태 유지 및 라우팅 추가, 기존 코드 보존)
// import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
// import { HelmetProvider } from "react-helmet-async";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Aos from "aos";
// import gsap from "gsap";
// import "aos/dist/aos.css";

// import TpHeader02 from "./layout/TpHeader/TpHeader02";
// import TpFooter01 from "./layout/TpFooter/TpFooter01";
// import AnimateRoutes from "./AnimatedRoutes";
// import TpPage03 from "./views/TpPage03";
// import LoginPage from "./views/LoginPage";

// import { homeMainLicense } from "./constants/data/home";
// import { homeNews } from "./constants/data/home";
// import { assetGridCard } from "./constants/data/asset";
// import { aboutSwiper } from "./constants/data/about";
// import { newsGridCard } from "./constants/data/news";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const preloadImages = (imageList) => {
//   imageList.forEach((src) => {
//     const img = new Image();
//     img.src = src;
//   });
// };

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const containerRef = useRef();

//   // ✅ 로그인 상태 감지
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `${process.env.PUBLIC_URL}/smoothScroll.js`;
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   useLayoutEffect(() => {
//     const el = containerRef.current?.querySelector(".tpSection08");
//     if (el) {
//       gsap.to(el, {
//         x: 100,
//         duration: 1,
//         onUpdate: () => {
//           if (el.innerText) console.log(el.innerText);
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const allImages = [
//       ...homeMainLicense.mainLicense_img.map((item) => item.img),
//       ...homeNews.news_img.map((item) => item.img),
//       ...newsGridCard.gridCard_img.map((item) => item.img),
//       ...aboutSwiper.swiper_img.first.map((item) => item.img),
//       ...aboutSwiper.swiper_img.second.map((item) => item.img),
//       ...aboutSwiper.swiper_img.third.map((item) => item.img),
//       ...assetGridCard.gridCard_img.tv.map((item) => item.img),
//       ...assetGridCard.gridCard_img.ani.map((item) => item.img),
//     ];
//     preloadImages(allImages);
//   }, []);

//   useEffect(() => {
//     Aos.init({ duration: 600, once: false });
//     Aos.refresh();
//   });

//   return (
//     <HelmetProvider>
//       <Router>
//         <TpHeader02 />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               loading ? (
//                 <div style={{ padding: 100, textAlign: "center" }}>로딩 중...</div>
//               ) : user ? (
//                 <TpPage03 user={user} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>
//         <TpFooter01 />
//       </Router>
//     </HelmetProvider>
//   );
// };

// export default App;

