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



// ✅ AnimateRoutes.jsx (로그인 여부 확인 추가)
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

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

function AnimateRoutes({ user, loading, setUser }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/adf"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />

          <Route
            path="/news"
            element={
              <PageWrapper>
                <NewsPage />
              </PageWrapper>
            }
          />

          <Route
            path="/productPage01"
            element={
              <PageWrapper>
                <Tpsection08 />
              </PageWrapper>
            }
          />
          <Route
            path="/productPage02"
            element={
              <PageWrapper>
                <TpPage02 />
              </PageWrapper>
            }
          />
          <Route
            path="/productPage03"
            element={
              <PageWrapper>
                {loading ? (
                  <div>로딩 중...</div>
                ) : user ? (
                  <TpPage03 user={user} />
                ) : (
                  <Navigate to="/login" />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <LoginPage setUser={setUser} />              
              </PageWrapper>
            }
          />
          <Route
            path="/adm"
            element={
              <PageWrapper>
                {loading ? (
                  <div>로딩 중...</div> // 또는 Spinner
                ) : user && user.isAdmin ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/"
            element={
              <PageWrapper>
                <TpPage />
              </PageWrapper>
            }
          />
          <Route
            path="/signUp"
            element={
              <PageWrapper>
                <SignUpSection01 />
              </PageWrapper>
            }
          />
          <Route
            path="/naver/callback"
            element={
              <PageWrapper>
              <NaverCallback setUser={setUser} />
            </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const PageWrapper = ({ children }) => {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
};

export default AnimateRoutes;