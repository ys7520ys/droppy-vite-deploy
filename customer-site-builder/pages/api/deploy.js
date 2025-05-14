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


// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain, orderId } = JSON.parse(req.body);
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
//   const subdomain = domain.split(".")[0];

//   try {
//     // ① 고객용 사이트 새로 생성
//     const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: `site-${subdomain}-${Date.now()}`, // site name 중복 방지
//       }),
//     });

//     const siteData = await siteRes.json();

//     if (!siteRes.ok) {
//       console.error("❌ 사이트 생성 실패:", siteData);
//       return res.status(500).json({ success: false, message: "사이트 생성 실패", raw: siteData });
//     }

//     const newSiteId = siteData.id;

//     // ② 도메인 연결
//     const domainRes = await fetch(
//       `https://api.netlify.com/api/v1/sites/${newSiteId}/domains`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: domain }), // aaa.droppy.kr
//       }
//     );

//     const domainData = await domainRes.json();

//     if (!domainRes.ok) {
//       console.error("❌ 도메인 연결 실패:", domainData);
//       return res.status(500).json({ success: false, message: "도메인 연결 실패", raw: domainData });
//     }

//     // ③ 이제 해당 폴더를 배포하거나, webhook 호출 or deploy endpoint 사용
//     // 이건 옵션에 따라 다르게 구성 가능

//     return res.status(200).json({
//       success: true,
//       message: "새 사이트 생성 및 도메인 연결 완료!",
//       siteUrl: siteData.ssl_url || siteData.url,
//     });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: "서버 내부 오류" });
//   }
// }


// import fs from "fs";
// import path from "path";
// import fetch from "node-fetch";
// import archiver from "archiver";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain } = JSON.parse(req.body);
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
//   const subdomain = domain.split(".")[0];

//   try {
//     // ① Netlify 사이트 생성
//     const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: `site-${subdomain}-${Date.now()}` }),
//     });

//     const site = await siteRes.json();
//     const siteId = site.id;

//     // ② 도메인 연결
//     await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/domains`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     // ③ 고객용 HTML 복사 → index.html
//     const srcHtml = path.resolve(`out/customer/${subdomain}.html`);
//     const deployDir = path.resolve(`.deploy-temp/${subdomain}`);
//     fs.mkdirSync(deployDir, { recursive: true });
//     fs.copyFileSync(srcHtml, path.join(deployDir, "index.html"));

//     // ④ 디렉토리 압축 (ZIP)
//     const zipPath = path.resolve(`.deploy-temp/${subdomain}.zip`);
//     await new Promise((resolve, reject) => {
//       const output = fs.createWriteStream(zipPath);
//       const archive = archiver("zip");

//       output.on("close", resolve);
//       archive.on("error", reject);

//       archive.pipe(output);
//       archive.directory(deployDir, false);
//       archive.finalize();
//     });

//     const zipBuffer = fs.readFileSync(zipPath);

//     // ⑤ Netlify ZIP 업로드
//     const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/zip",
//       },
//       body: zipBuffer,
//     });

//     const deploy = await deployRes.json();

//     return res.status(200).json({
//       success: true,
//       siteUrl: site.ssl_url || site.url,
//       domain,
//     });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: "배포 실패" });
//   }
// }






// // ✅ 수정된 deploy.js (pages/api/deploy.js)
// import fs from "fs";
// import path from "path";
// import fetch from "node-fetch";
// import archiver from "archiver";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { domain } = JSON.parse(req.body);
//   const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
//   const subdomain = domain.split(".")[0];

//   try {
//     // ① Netlify 사이트 생성
//     const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: `site-${subdomain}-${Date.now()}` }),
//     });

//     const site = await siteRes.json();
//     const siteId = site.id;

//     if (!siteId) {
//       throw new Error("Netlify 사이트 생성 실패. site.id 없음");
//     }

//     // ② 도메인 연결
//     const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/domains`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     if (!domainRes.ok) {
//       const errorDetail = await domainRes.text();
//       throw new Error(`도메인 연결 실패: ${errorDetail}`);
//     }

//     // ③ HTML 복사
//     const srcHtml = path.resolve(`out/customer/${subdomain}.html`);
//     const deployDir = path.resolve(`.deploy-temp/${subdomain}`);
//     const deployIndex = path.join(deployDir, "index.html");

//     fs.mkdirSync(deployDir, { recursive: true });
//     fs.copyFileSync(srcHtml, deployIndex);

//     // ④ ZIP 압축
//     const zipPath = path.resolve(`.deploy-temp/${subdomain}.zip`);
//     await new Promise((resolve, reject) => {
//       const output = fs.createWriteStream(zipPath);
//       const archive = archiver("zip", { zlib: { level: 9 } });

//       output.on("close", resolve);
//       archive.on("error", reject);

//       archive.pipe(output);
//       archive.directory(deployDir, false);
//       archive.finalize();
//     });

//     // ⑤ Netlify ZIP 업로드
//     const zipBuffer = fs.readFileSync(zipPath);
//     const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/zip",
//       },
//       body: zipBuffer,
//     });

//     const deploy = await deployRes.json();

//     if (!deploy.ssl_url) {
//       throw new Error("Netlify 배포 실패: ssl_url 없음");
//     }

//     return res.status(200).json({
//       success: true,
//       siteUrl: deploy.ssl_url,
//       domain,
//     });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: err.message || "배포 실패" });
//   }
// }




// ✅ /pages/api/deploy.js (SaaS 방식: 고객마다 새로운 Netlify 사이트 생성)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { domain, orderId } = JSON.parse(req.body);
  const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;

  console.log("🔥 요청받은 도메인:", domain);
  console.log("🔥 주문 ID:", orderId);

  try {
    // ✅ 1. Netlify에 새 사이트 생성
    const createSiteRes = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `droppy-${orderId}`, // 고유한 사이트 이름
        custom_domain: domain,     // 도메인 연결 (예: shopy.droppy.kr)
      }),
    });

    const createSiteData = await createSiteRes.json();
    console.log("📦 Netlify 사이트 생성 결과:", createSiteData);

    if (!createSiteRes.ok) {
      return res.status(500).json({
        success: false,
        message: "Netlify 사이트 생성 실패",
        error: createSiteData,
      });
    }

    const newSiteId = createSiteData.id;

    // ✅ 2. 사이트 빌드 트리거 (빌드 훅 사용하거나 필요 시 API로 직접 배포)
    // [선택 사항] createSiteData.build_settings.build_hook_id 사용 가능
    await fetch("https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24", {
      method: "POST",
    });

    return res.status(200).json({
      success: true,
      message: "고객용 사이트 생성 및 배포 완료",
      siteId: newSiteId,
      domain,
    });
  } catch (err) {
    console.error("🔥 오류 발생:", err);
    return res.status(500).json({ success: false, message: "서버 오류", error: err });
  }
}
