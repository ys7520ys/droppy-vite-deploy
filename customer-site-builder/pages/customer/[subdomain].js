// ✅ pages/customer/[subdomain].js
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ 클라이언트 사이드 컴포넌트 로딩
const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
      페이지 불러오는 중...
    </div>
  ),
});

// ✅ 정적 경로 생성 비활성화 → 요청 시마다 생성
export async function getStaticPaths() {
  return {
    paths: [], // 사전 생성 경로 없음
    fallback: "blocking", // 요청 시 페이지 생성
  };
}

// ✅ 빌드 시 또는 요청 시 정적 데이터 가져오기
export async function getStaticProps({ params }) {
  const subdomain = params?.subdomain?.toLowerCase?.();
  const fullDomain = `${subdomain}.droppy.kr`;

  try {
    const q = query(
      collection(db, "orders"),
      where("domain", "==", fullDomain)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { notFound: true };
    }

    const pageData = querySnapshot.docs[0].data();

    return {
      props: { pageData },
      revalidate: 60, // ISR: 60초마다 갱신
    };
  } catch (error) {
    console.error("🔥 Firestore 도메인 조회 실패:", error);
    return { notFound: true };
  }
}

// ✅ 실제 페이지 구성
export default function CustomerPage({ pageData }) {
  return <CustomerContent pageData={pageData} />;
}
