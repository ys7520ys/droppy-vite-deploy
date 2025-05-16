// // /pages/api/deploy.js

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain, orderId } = JSON.parse(req.body);

//   // ✅ Netlify 정보 (환경변수로 관리 권장)
//   const SITE_ID = "당신의_Site_ID"; // Netlify → Site settings → Site details
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN; // .env.local에 넣기
//   const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//   try {
//     // ✅ 1. Netlify에 도메인 추가 (예: first.droppy.kr)
//     const response = await fetch(NETLIFY_API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }), // ex: first.droppy.kr
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       console.error("🔥 Netlify 도메인 연결 실패:", result);
//       return res.status(500).json({ success: false, message: result.message || "Netlify 도메인 연결 실패" });
//     }

//     // ✅ 2. Netlify 빌드 훅 호출 (선택)
//     const buildHook = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";
//     await fetch(buildHook, { method: "POST" });

//     return res.status(200).json({ success: true, message: "도메인 연결 및 배포 성공!" });
//   } catch (err) {
//     console.error("🔥 오류:", err);
//     return res.status(500).json({ success: false, message: "서버 오류" });
//   }
// }







// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain, orderId } = JSON.parse(req.body);

//   const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121"; // 실제 Site ID
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
//   const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//   try {
//     // ✅ 1. Netlify에 도메인 등록 요청
//     const response = await fetch(NETLIFY_API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     const rawText = await response.text();

//     let result;
//     try {
//       result = JSON.parse(rawText);
//     } catch (jsonErr) {
//       console.error("🔥 JSON 파싱 실패 - 응답 내용:", rawText);
//       return res.status(500).json({ success: false, message: "Netlify 응답이 유효하지 않음", raw: rawText });
//     }

//     if (!response.ok) {
//       console.error("🔥 Netlify 도메인 등록 실패:", result);
//       return res.status(500).json({ success: false, message: result.message || "Netlify 실패" });
//     }

//     // ✅ 2. Netlify 빌드 훅 호출
//     const buildHook = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";
//     await fetch(buildHook, { method: "POST" });

//     return res.status(200).json({ success: true, message: "도메인 등록 + 배포 성공!" });
//   } catch (err) {
//     console.error("🔥 서버 처리 실패:", err);
//     return res.status(500).json({ success: false, message: "서버 오류" });
//   }
// }



// // /pages/api/deploy.js

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain, orderId } = JSON.parse(req.body);

//   console.log("🔥 요청받은 domain:", domain);
//   console.log("🔥 요청받은 orderId:", orderId);

//   const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121";
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
//   const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//   try {
//     const response = await fetch(NETLIFY_API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     const result = await response.text(); // <- ✅ 에러 추적 위해 json 대신 text
//     console.log("📦 Netlify 응답 내용:", result);

//     if (!response.ok) {
//       return res.status(500).json({
//         success: false,
//         message: "Netlify 도메인 연결 실패",
//         raw: result,
//       });
//     }

//     await fetch("https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24", {
//       method: "POST",
//     });

//     return res.status(200).json({ success: true, message: "도메인 연결 및 배포 성공!" });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: "서버 내부 오류" });
//   }
// }


export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method Not Allowed" });

  const { domain } = req.body;
  const subdomain = domain.replace(".droppy.kr", "");
  const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;

  try {
    // ✅ Netlify에 새 사이트 생성 (droppy-builder GitHub 저장소 사용)
    const createRes = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${subdomain}-droppy-kr`,
        repo: {
          repo_provider: "github",
          repo_url: "https://github.com/ys7520ys/salePage", // droppy-builder의 GitHub 저장소
          branch: "main"
        },
        build_settings: {
          cmd: "npm run build && npm run export",
          dir: "out"
        }
      }),
    });

    const siteData = await createRes.json();
    console.log("✅ Netlify 사이트 생성 응답:", siteData);

    if (!createRes.ok) {
      return res.status(500).json({ success: false, message: "사이트 생성 실패", raw: siteData });
    }

    const siteId = siteData.id;

    // ✅ 도메인 연결
    const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/domains`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    });

    const domainData = await domainRes.json();
    console.log("🌐 도메인 연결 응답:", domainData);

    if (!domainRes.ok) {
      return res.status(500).json({ success: false, message: "도메인 연결 실패", raw: domainData });
    }

    return res.status(200).json({
      success: true,
      message: "사이트 생성 및 도메인 연결 완료!",
      url: `https://${domain}`
    });

  } catch (err) {
    console.error("🔥 서버 오류 발생:", err);
    return res.status(500).json({ success: false, message: "서버 오류", error: err.message });
  }
}
