// // ✅ pages/customer/[subdomain].js
// import dynamic from "next/dynamic";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
//       페이지 불러오는 중...
//     </div>
//   ),
// });

// export async function getStaticPaths() {
//   return {
//     paths: [], // 정적 경로 사전 생성 없음
//     fallback: "blocking", // 요청 시 빌드
//   };
// }

// export async function getStaticProps({ params }) {
//   const subdomain = params?.subdomain?.toLowerCase?.();

//   if (!subdomain) {
//     console.warn("❗ 서브도메인 파라미터 없음");
//     return { notFound: true };
//   }

//   const fullDomain = `${subdomain}.droppy.kr`;

//   try {
//     const q = query(
//       collection(db, "orders"),
//       where("domain", "==", fullDomain)
//     );

//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       console.warn(`❌ '${fullDomain}'에 해당하는 도큐먼트가 없음`);
//       return { notFound: true };
//     }

//     const pageData = querySnapshot.docs[0].data();

//     return {
//       props: { pageData },
//       revalidate: 60, // 🔁 ISR: 60초마다 갱신
//     };
//   } catch (error) {
//     console.error("🔥 Firestore 도메인 조회 실패:", error);
//     return { notFound: true };
//   }
// }

// export default function CustomerPage({ pageData }) {
//   return <CustomerContent pageData={pageData} />;
// }









// ✅ pages/[subdomain].js
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ 고객 콘텐츠 컴포넌트 (클라이언트 전용 렌더링)
const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
      페이지 불러오는 중...
    </div>
  ),
});

// ✅ Firestore에 저장된 모든 도메인 기반으로 정적 경로 생성
export async function getStaticPaths() {
  try {
    const snapshot = await getDocs(collection(db, "orders"));
    const paths = snapshot.docs.map((doc) => {
      const domain = doc.data().domain; // ex: myshop.droppy.kr
      const subdomain = domain.split(".")[0]; // 'myshop'
      return { params: { subdomain } };
    });

    return {
      paths,
      fallback: false, // ✅ 완전 정적 사이트로 만들기 위해 false
    };
  } catch (err) {
    console.error("🔥 getStaticPaths 실패:", err);
    return {
      paths: [],
      fallback: false,
    };
  }
}

// ✅ 정적 페이지 생성 시 각 도메인 데이터 불러오기
export async function getStaticProps({ params }) {
  const subdomain = params?.subdomain?.toLowerCase?.();

  if (!subdomain) {
    console.warn("❗ 서브도메인 없음");
    return { notFound: true };
  }

  const fullDomain = `${subdomain}.droppy.kr`;

  try {
    const q = query(
      collection(db, "orders"),
      where("domain", "==", fullDomain)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      console.warn(`❌ '${fullDomain}' 문서 없음`);
      return { notFound: true };
    }

    const pageData = snap.docs[0].data();

    return {
      props: { pageData },
    };
  } catch (err) {
    console.error("🔥 getStaticProps 실패:", err);
    return { notFound: true };
  }
}

// ✅ 최종 페이지
export default function CustomerPage({ pageData }) {
  return <CustomerContent pageData={pageData} />;
}
