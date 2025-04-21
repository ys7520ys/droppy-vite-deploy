import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverCallback = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      console.log("✅ 네이버 로그인 성공! Access Token:", accessToken);

      fetch("http://localhost:4000/naver/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("🙋 네이버 사용자 정보:", data.response);

          // ✅ 여기서 저장!
          setUser(data.response);
          localStorage.setItem("naverUser", JSON.stringify(data.response));

          // 👉 원하는 페이지로 이동
          navigate("/productPage03");
        })
        .catch((err) => {
          console.error("❌ 사용자 정보 요청 실패:", err);
        });
    } else {
      console.warn("😢 access_token이 없습니다.");
    }
  }, [navigate, setUser]);

  return <div>🔄 네이버 로그인 처리 중입니다...</div>;
};

export default NaverCallback;

