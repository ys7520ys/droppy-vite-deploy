// ✅ pages/customer/[subdomain].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ 클라이언트 사이드에서만 로딩될 컴포넌트
const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
      페이지 불러오는 중...
    </div>
  ),
});

export default function CustomerPage() {
  const router = useRouter();
  const { subdomain } = router.query;

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      if (!subdomain) return;

      const fullDomain = `${subdomain.toLowerCase()}.droppy.kr`;

      try {
        const q = query(
          collection(db, "orders"),
          where("domain", "==", fullDomain)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setPageData(data);
        } else {
          setPageData(null);
        }
      } catch (error) {
        console.error("🔥 Firestore 도메인 조회 실패:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [subdomain]);

  if (loading) {
    return (
      <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
        페이지 로딩 중...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div style={{ color: "#fff", padding: "100px", textAlign: "center" }}>
        ❌ 해당 페이지를 찾을 수 없습니다.
      </div>
    );
  }

  return <CustomerContent pageData={pageData} />;
}
