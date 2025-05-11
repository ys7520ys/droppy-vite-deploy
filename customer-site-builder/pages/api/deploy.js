// /pages/api/deploy.js

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { domain, orderId } = JSON.parse(req.body);

  // ✅ Netlify 정보 (환경변수로 관리 권장)
  const SITE_ID = "당신의_Site_ID"; // Netlify → Site settings → Site details
  const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN; // .env.local에 넣기
  const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

  try {
    // ✅ 1. Netlify에 도메인 추가 (예: first.droppy.kr)
    const response = await fetch(NETLIFY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }), // ex: first.droppy.kr
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("🔥 Netlify 도메인 연결 실패:", result);
      return res.status(500).json({ success: false, message: result.message || "Netlify 도메인 연결 실패" });
    }

    // ✅ 2. Netlify 빌드 훅 호출 (선택)
    const buildHook = "https://api.netlify.com/build_hooks/당신의_빌드_훅_ID";
    await fetch(buildHook, { method: "POST" });

    return res.status(200).json({ success: true, message: "도메인 연결 및 배포 성공!" });
  } catch (err) {
    console.error("🔥 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
}
