// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import dynamic from "next/dynamic";

// // ✅ 동적으로 컴포넌트 로딩 (SSR 비활성화)
// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
//       페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function CustomerPage() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const fullDomain = `${subdomain}.droppy.kr`;

//       try {
//         const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           setPageData(snapshot.docs[0].data());
//         }
//       } catch (err) {
//         console.error("🔥 Firestore 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
//         🔄 페이지 불러오는 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
//         ❌ 해당 페이지를 찾을 수 없습니다.
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }















// // pages/customer/[subdomain].js
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import dynamic from "next/dynamic";
// import Head from "next/head";

// // ✅ 동적 import (클라이언트에서만 렌더링되는 컴포넌트)
// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", color: "#fff", textAlign: "center" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// // ✅ 도메인 기반 데이터 fetch (정적 생성용)
// export async function getStaticProps({ params }) {
//   const subdomain = params.subdomain;
//   const fullDomain = `${subdomain}.droppy.kr`;

//   try {
//     const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       return { notFound: true };
//     }

//     const pageData = snapshot.docs[0].data();

//     return {
//       props: { pageData },
//       revalidate: 60, // 선택: 60초마다 재빌드 가능
//     };
//   } catch (error) {
//     console.error("🔥 Firestore 데이터 로드 실패:", error);
//     return { notFound: true };
//   }
// }

// // ✅ 요청 시 정적으로 생성하도록 설정
// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking", // 경로가 없으면 처음 요청 시 생성
//   };
// }

// export default function CustomerPage({ pageData }) {
//   if (!pageData) {
//     return (
//       <div style={{ padding: 100, color: "#fff", textAlign: "center" }}>
//         ❌ 해당 페이지를 찾을 수 없습니다.
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{pageData.title || "Droppy"}</title>
//       </Head>
//       <CustomerContent pageData={pageData} />
//     </>
//   );
// }

















// // pages/customer/[subdomain].js
// import { db } from "@/lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import dynamic from "next/dynamic";

// // 🔁 CSR 컴포넌트 동적 import
// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ textAlign: "center", padding: "100px", color: "#fff" }}>
//       페이지 불러오는 중...
//     </div>
//   ),
// });

// export async function getStaticPaths() {
//   // 선택적 사전 렌더링: 모든 하위 도메인 미리 알 수 없으므로 fallback 사용
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   const subdomain = params.subdomain;
//   const fullDomain = `${subdomain}.droppy.kr`;

//   try {
//     const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       return { notFound: true };
//     }

//     const pageData = snapshot.docs[0].data();

//     return {
//       props: {
//         pageData,
//       },
//       revalidate: 60, // ISR (선택적)
//     };
//   } catch (err) {
//     console.error("🔥 Firestore 불러오기 실패:", err);
//     return { notFound: true };
//   }
// }

// export default function CustomerPage({ pageData }) {
//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 페이지 데이터를 찾을 수 없습니다.
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }








// // pages/customer/[subdomain].js
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function CustomerPage() {
//   const router = useRouter();
//   const { subdomain } = router.query;

//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!subdomain) return;

//     const fetchData = async () => {
//       const fullDomain = `${subdomain}.droppy.kr`;

//       try {
//         const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           setPageData(snapshot.docs[0].data());
//         }
//       } catch (err) {
//         console.error("🔥 Firestore 데이터 로딩 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [subdomain]);

//   if (loading) {
//     return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>로딩 중...</div>;
//   }

//   if (!pageData) {
//     return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>❌ 데이터를 찾을 수 없습니다</div>;
//   }

//   return <CustomerContent pageData={pageData} />;
// }






// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function CustomerPage() {
//   const router = useRouter();
//   const { subdomain } = router.query;

//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!subdomain) return;

//     const fetchData = async () => {
//       const fullDomain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://autodeploy-zify4iutq-uc.a.run.app/getPageData?domain=${fullDomain}`
//         );
//         const data = await res.json();

//         if (!data || data.error) {
//           throw new Error(data?.error || "데이터 없음");
//         }

//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [subdomain]);

//   if (loading) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         로딩 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 데이터를 찾을 수 없습니다
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }





//마지막 수정정
// import fs from "fs";
// import path from "path";
// import CustomerContent from "@/components/CustomerContent";

// export async function getStaticPaths() {
//   // 미리 정의할 고객 서브도메인 목록 (배포 시점 기준)
//   return {
//     paths: [{ params: { subdomain: "shopy" } }], // 기본 예시
//     fallback: false, // 없으면 404
//   };
// }

// export async function getStaticProps({ params }) {
//   const filePath = path.join(process.cwd(), "public", "pageData.json");
//   const jsonData = fs.readFileSync(filePath, "utf-8");
//   const pageData = JSON.parse(jsonData);

//   return {
//     props: { pageData },
//   };
// }

// export default function CustomerPage({ pageData }) {
//   return <CustomerContent pageData={pageData} />;
// }

//마지막 수정3
import fs from "fs";
import path from "path";
import CustomerContent from "@/components/CustomerContent";

export async function getStaticPaths() {
  return {
    paths: [], // 사전 빌드 없음
    fallback: "blocking", // ⭐ 동적 생성 허용
  };
}

export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "public", "pageData.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const pageData = JSON.parse(jsonData);

    return {
      props: { pageData },
    };
  } catch (error) {
    console.error("❌ pageData.json 읽기 실패:", error);
    return {
      notFound: true, // 파일 없으면 404 반환
    };
  }
}

export default function CustomerPage({ pageData }) {
  return <CustomerContent pageData={pageData} />;
}
