// ✅ pages/customer/[subdomain].js
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
      페이지 불러오는 중...
    </div>
  ),
});

export async function getStaticPaths() {
  return {
    paths: [], // 정적 경로 사전 생성 없음
    fallback: "blocking", // 요청 시 빌드
  };
}

export async function getStaticProps({ params }) {
  const subdomain = params?.subdomain?.toLowerCase?.();

  if (!subdomain) {
    console.warn("❗ 서브도메인 파라미터 없음");
    return { notFound: true };
  }

  const fullDomain = `${subdomain}.droppy.kr`;

  try {
    const q = query(
      collection(db, "orders"),
      where("domain", "==", fullDomain)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`❌ '${fullDomain}'에 해당하는 도큐먼트가 없음`);
      return { notFound: true };
    }

    const pageData = querySnapshot.docs[0].data();

    return {
      props: { pageData },
      revalidate: 60, // 🔁 ISR: 60초마다 갱신
    };
  } catch (error) {
    console.error("🔥 Firestore 도메인 조회 실패:", error);
    return { notFound: true };
  }
}

export default function CustomerPage({ pageData }) {
  return <CustomerContent pageData={pageData} />;
}
