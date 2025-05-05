// import React, { Children } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
// import HomePage from "./views/HomePage";
// import AboutPage from "./views/AboutPage";
// import AssetPage from "./views/AssetPage";
// import NewsPage from "./views/NewsPage";
// import ContactPage from "./views/ContactPage";
// import DetailPage from "./views/DetailPage";

// import TpPage from "./views/TpPage";
// import Tpsection08 from "./components/TpSection/TpSection08";
// import TpPage02 from "./views/TpPage02";
// import TpPage03 from "./views/TpPage03";
// import AdminPage from "./views/AdminPage";
// import LoginPage from "./views/LoginPage";

// const pageVariants = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
// }

// function AnimateRoutes() {
//   const location = useLocation();
  
//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {/* wait의 값을 설정하여 페이지가 전환될 때 적용된다. */}
//         <Routes location={location} key={location.pathname}>
//           <Route
//             path="/adf"
//             element={
//               <PageWrapper>
//                 <HomePage />
//               </PageWrapper>
//             }
//           />
//           {/* <Route
//             path="/about"
//             element={
//               <PageWrapper>
//                 <AboutPage />
//               </PageWrapper>
//             }
//           />
//           <Route  
//             path="/asset"
//             element={
//               <PageWrapper>
//                 <AssetPage />
//               </PageWrapper>
//             }
//           /> */}
//           <Route 
//             path="/news"
//             element={
//               <PageWrapper>
//                 <NewsPage />
//               </PageWrapper>
//             }
//           />
//           <Route 
//             path="/productPage01"
//             element={
//               <PageWrapper>
//                 <Tpsection08 />                
//               </PageWrapper>
//             }
//           />
//           <Route 
//             path="/productPage02"
//             element={
//               <PageWrapper>
//                 <TpPage02 />
//               </PageWrapper>
//             }
//           />
//           <Route 
//             path="/productPage03"
//             element={
//               <PageWrapper>
//                 <TpPage03 />
//               </PageWrapper>
//             }
//           />
//           <Route 
//             path="/login"
//             element={
//               <PageWrapper>
//                 <LoginPage />
//               </PageWrapper>
//             }
//           />


//           <Route 
//             path="/adm"
//             element={
//               <PageWrapper>
//                 <AdminPage />
//               </PageWrapper>
//             }
//           />



//           {/* <Route 
//             path="/contactUs"
//             element={
//               <PageWrapper>
//                 <ContactPage />
//               </PageWrapper>
//             }
//           /> */}
//           {/* <Route 
//             path="/detail"
//             element={
//               <PageWrapper>
//                 <DetailPage />
//               </PageWrapper>
//             }
//           /> */}
//           <Route 
//             path="/"
//             element={
//               <PageWrapper>
//                 <TpPage />
//               </PageWrapper>
//             }
//           />
//         </Routes>
//       </AnimatePresence>
//     </>
//   )
// }

// const PageWrapper = ({ children }) => {
//   return (
//     <motion.main
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//     >
//       {children}
//     </motion.main>
//   )
// }

// export default AnimateRoutes;



import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "./views/HomePage";
import AboutPage from "./views/AboutPage";
import AssetPage from "./views/AssetPage";
import NewsPage from "./views/NewsPage";
import ContactPage from "./views/ContactPage";
import DetailPage from "./views/DetailPage";

import TpPage from "./views/TpPage";
import Tpsection08 from "./components/TpSection/TpSection08";
import TpPage02 from "./views/TpPage02";
import TpPage03 from "./views/TpPage03";
import AdminPage from "./views/AdminPage";
import LoginPage from "./views/LoginPage";
import NaverCallback from "./views/NaverCallback";
import SignUpSection01 from "./components/TpSection/SignUp";
import TpPagePreview from "./views/TpPagePreview";
import ProductDetail from "./components/TpSection/ProductDetail";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

const PageWrapper = ({ children }) => (
  <motion.main
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.main>
);

function AnimateRoutes({ user, loading, setUser }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname + location.search}>
        <Route path="/adf" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/news" element={<PageWrapper><NewsPage /></PageWrapper>} />
        <Route path="/productPage01" element={<PageWrapper><Tpsection08 /></PageWrapper>} />
        <Route path="/productPage02" element={<PageWrapper><TpPage02 /></PageWrapper>} />
        <Route
          path="/productPage03"
          element={
            <PageWrapper>
              {loading ? <div>로딩 중...</div> : user ? <TpPage03 user={user} /> : <Navigate to="/login" />}
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={<PageWrapper><LoginPage setUser={setUser} /></PageWrapper>}
        />
        <Route
          path="/adm"
          element={
            <PageWrapper>
              {loading ? <div>로딩 중...</div> : user && user.isAdmin ? <AdminPage /> : <Navigate to="/login" />}
            </PageWrapper>
          }
        />
        <Route path="/" element={<PageWrapper><TpPage /></PageWrapper>} />
        <Route path="/signUp" element={<PageWrapper><SignUpSection01 /></PageWrapper>} />

        {/* ✅ /preview는 header/footer 없이 단독 렌더링 (PageWrapper는 유지) */}
        <Route
          path="/preview"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ background: "#fff", minHeight: "100vh" }}
            >
              <TpPagePreview />
            </motion.div>
          }
        />

        <Route path="/naver/callback" element={<PageWrapper><NaverCallback setUser={setUser} /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimateRoutes;
