// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const fetch = require("node-fetch");

// // 🔐 시크릿
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
// const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d"; // droppy-builder 템플릿

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 요청 도착!");

//     // ✅ body 수동 파싱
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     logger.info("📦 받은 body:", body);

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 없음");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // ✅ 1. 템플릿 사이트 복제
//       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           site_id: TEMPLATE_SITE_ID,
//           name: domain.replace(".droppy.kr", ""),
//         }),
//       });

//       const cloneText = await cloneRes.text();
//       let cloneData;

//       try {
//         cloneData = JSON.parse(cloneText);
//       } catch (jsonErr) {
//         logger.error("❌ 복제 응답 JSON 파싱 실패:", cloneText);
//         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
//       }

//       if (!cloneRes.ok) {
//         logger.error("❌ 사이트 복제 실패:", cloneData);
//         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
//       }

//       logger.log("✅ 사이트 복제 성공:", cloneData);

//       // ✅ 2. 도메인 연결 (PATCH 방식으로)
//       const domainRes = await fetch(
//         `https://api.netlify.com/api/v1/sites/${cloneData.id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             custom_domain: domain, // 예: shopy123.droppy.kr
//           }),
//         }
//       );

//       const domainText = await domainRes.text();
//       let domainData;

//       try {
//         domainData = JSON.parse(domainText);
//       } catch (jsonErr) {
//         logger.error("❌ 도메인 응답 JSON 파싱 실패:", domainText);
//         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
//       }

//       if (!domainRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", domainData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
//       }

//       logger.log("✅ 도메인 연결 성공:", domainData);

//       return res.status(200).json({
//         message: "✅ 사이트 복제 및 도메인 연결 완료",
//         siteUrl: cloneData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류:", err);
//       return res.status(500).json({ message: "서버 오류", error: err.message });
//     }
//   }
// );








































// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const fetch = require("node-fetch");

// // 🔐 Netlify 토큰 및 템플릿 ID
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
// const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d";

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 [1] 요청 도착!");

//     // ✅ body 수동 파싱 (string 또는 object 대응)
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;
//     logger.info("📦 [2] 받은 body:", body);

//     if (!domain || !orderId) {
//       logger.error("❗ [3] 도메인 또는 주문 ID가 없음");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // ✅ [4] 템플릿 복제 요청
//       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           site_id: TEMPLATE_SITE_ID,
//           name: domain.replace(".droppy.kr", ""), // 하위 도메인 이름
//         }),
//       });

//       const cloneText = await cloneRes.text();
//       let cloneData;

//       try {
//         cloneData = JSON.parse(cloneText);
//       } catch (jsonErr) {
//         logger.error("❌ [5] 복제 응답 파싱 실패:", cloneText);
//         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
//       }

//       if (!cloneRes.ok) {
//         logger.error("❌ [6] 사이트 복제 실패:", cloneData);
//         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
//       }

//       logger.info("✅ [7] 사이트 복제 성공:", cloneData.name, cloneData.ssl_url);

//       // ✅ [8] custom_domain 연결 요청
//       const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${cloneData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           custom_domain: domain,
//         }),
//       });

//       const domainText = await domainRes.text();
//       let domainData;

//       try {
//         domainData = JSON.parse(domainText);
//       } catch (jsonErr) {
//         logger.error("❌ [9] 도메인 응답 파싱 실패:", domainText);
//         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
//       }

//       if (!domainRes.ok) {
//         logger.error("❌ [10] 도메인 연결 실패:", domainData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
//       }

//       logger.info("✅ [11] 도메인 연결 성공:", domain);

//       // ✅ [12] 최종 성공 응답
//       return res.status(200).json({
//         message: "✅ 사이트 복제 및 도메인 연결 완료",
//         siteUrl: cloneData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 [13] 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );










  // const { onRequest } = require("firebase-functions/v2/https");
  // const { defineSecret } = require("firebase-functions/params");
  // const logger = require("firebase-functions/logger");
  // const fetch = require("node-fetch");

  // const { initializeApp, applicationDefault } = require("firebase-admin/app");
  // const { getFirestore } = require("firebase-admin/firestore");

  // initializeApp({ credential: applicationDefault() });
  // const db = getFirestore();

  // // 🔐 Netlify용 시크릿
  // const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
  // const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d";

  // // ✅ [1] Netlify 사이트 복제 및 도메인 연결
  // exports.autoDeploy = onRequest(
  //   {
  //     cors: true,
  //     secrets: [NETLIFY_TOKEN],
  //   },
  //   async (req, res) => {
  //     logger.info("📥 [1] 요청 도착!");
  //     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  //     const { domain, orderId } = body;
  //     logger.info("📦 [2] 받은 body:", body);

  //     if (!domain || !orderId) {
  //       logger.error("❗ 도메인 또는 주문 ID 누락");
  //       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
  //     }

  //     try {
  //       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           site_id: TEMPLATE_SITE_ID,
  //           name: domain.replace(".droppy.kr", ""),
  //         }),
  //       });

  //       const cloneText = await cloneRes.text();
  //       let cloneData;

  //       try {
  //         cloneData = JSON.parse(cloneText);
  //       } catch (jsonErr) {
  //         logger.error("❌ 복제 응답 파싱 실패:", cloneText);
  //         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
  //       }

  //       if (!cloneRes.ok) {
  //         logger.error("❌ 사이트 복제 실패:", cloneData);
  //         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
  //       }

  //       logger.info("✅ 사이트 복제 성공:", cloneData.name, cloneData.ssl_url);

  //       const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${cloneData.id}`, {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           custom_domain: domain,
  //         }),
  //       });

  //       const domainText = await domainRes.text();
  //       let domainData;

  //       try {
  //         domainData = JSON.parse(domainText);
  //       } catch (jsonErr) {
  //         logger.error("❌ 도메인 응답 파싱 실패:", domainText);
  //         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
  //       }

  //       if (!domainRes.ok) {
  //         logger.error("❌ 도메인 연결 실패:", domainData);
  //         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
  //       }

  //       logger.info("✅ 도메인 연결 성공:", domain);

  //       return res.status(200).json({
  //         message: "✅ 사이트 복제 및 도메인 연결 완료",
  //         siteUrl: cloneData.ssl_url,
  //         domain,
  //       });

  //     } catch (err) {
  //       logger.error("🔥 전체 오류 발생:", err);
  //       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
  //     }
  //   }
  // );

  // // ✅ [2] 고객용 페이지 데이터 조회 (CORS 허용)
  // exports.getPageData = onRequest(
  //   {
  //     cors: true,
  //   },
  //   async (req, res) => {
  //     const domain = req.query.domain;
  //     if (!domain) {
  //       return res.status(400).json({ error: "❗ 도메인이 누락되었습니다" });
  //     }

  //     try {
  //       const snapshot = await db
  //         .collection("orders")
  //         .where("domain", "==", domain)
  //         .limit(1)
  //         .get();

  //       if (snapshot.empty) {
  //         return res.status(404).json({ error: "❌ 페이지를 찾을 수 없습니다" });
  //       }

  //       const data = snapshot.docs[0].data();
  //       return res.status(200).json(data);
  //     } catch (err) {
  //       console.error("🔥 Firestore 조회 실패:", err);
  //       return res.status(500).json({ error: "서버 오류 발생", detail: err.message });
  //     }
  //   }
  // );








// 마지막 수정
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json 저장
//       const pageDataPath = path.join(__dirname, "../droppy-builder/public/pageData.json");
//       fs.writeFileSync(pageDataPath, JSON.stringify(data, null, 2));
//       logger.info("📦 pageData.json 저장 완료");

//       // ✅ 2. 빌드 실행
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 3. zip 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 4. Netlify 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 5. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }

// // 마지막 수정2
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json을 /tmp 에 임시 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       // ✅ 2. droppy-builder/public 에 복사 (빌드에 사용됨)
//       const destPath = path.join(__dirname, "../droppy-builder/public/pageData.json");

//       // public 폴더가 없으면 생성
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 3. 빌드 실행
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 4. zip 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 5. Netlify에 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 6. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }



// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
    
//     // ✅ 문자열 파싱 제거 → 객체 그대로 사용
//     const body = req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json 임시 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       // ✅ 2. droppy-builder/public 에 복사
//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");

//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 3. 빌드
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 4. 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 5. Netlify에 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 6. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }





// 05/21 수정1
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
    
//     const body = req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");

//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData 함수 추가
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*"); // CORS 허용

//   const domain = req.query.domain;

//   if (!domain) {
//     return res.status(400).json({ message: "❗ domain 쿼리 누락됨" });
//   }

//   try {
//     const snapshot = await db
//       .collection("orders")
//       .where("domain", "==", domain)
//       .limit(1)
//       .get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: "❌ 해당 도메인의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.docs[0].data();

//     return res.status(200).json({
//       status: "success",
//       domain,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }






// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");

//     // ✅ 문자열 파싱 처리 (중요)
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ pageData 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }
//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 빌드
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ Netlify 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData 함수
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");

//   const domain = req.query.domain;
//   if (!domain) {
//     return res.status(400).json({ message: "❗ domain 쿼리 누락됨" });
//   }

//   try {
//     const snapshot = await db
//       .collection("orders")
//       .where("domain", "==", domain)
//       .limit(1)
//       .get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: "❌ 해당 도메인의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.docs[0].data();
//     return res.status(200).json({
//       status: "success",
//       domain,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }



// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");

//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }
//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData: ID 기반 조회
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");

//   const orderId = req.query.id;
//   if (!orderId) {
//     return res.status(400).json({ message: "❗ orderId 쿼리 누락됨" });
//   }

//   try {
//     const docRef = db.collection("orders").doc(orderId);
//     const snapshot = await docRef.get();

//     if (!snapshot.exists) {
//       return res.status(404).json({ message: "❌ 해당 주문 ID의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.data();

//     return res.status(200).json({
//       status: "success",
//       orderId,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }



// 새로운 구조 
// ✅ Firebase Function (functions/index.js)
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fetch = require("node-fetch");

const BUILD_HOOK_URL = defineSecret("BUILD_HOOK_URL");

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

exports.autoDeploy = onRequest(
  {
    cors: true,
    secrets: [BUILD_HOOK_URL],
  },
  async (req, res) => {
    const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!domain || !orderId) {
      logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
      return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
    }

    try {
      const docRef = db.collection("orders").doc(orderId);
      const snap = await docRef.get();

      if (!snap.exists) {
        return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
      }

      logger.info("📦 주문 데이터 확인 완료, Netlify 빌드 트리거 시작");

      const buildRes = await fetch(BUILD_HOOK_URL.value(), {
        method: "POST",
      });

      if (!buildRes.ok) {
        const errText = await buildRes.text();
        logger.error("❌ Netlify Build Hook 실패:", errText);
        return res.status(500).json({ message: "Netlify Build Hook 호출 실패", detail: errText });
      }

      logger.info("✅ Netlify Build Hook 호출 성공");
      return res.status(200).json({ message: "✅ 사이트 빌드 트리거 완료", domain });
    } catch (err) {
      logger.error("🔥 전체 오류 발생:", err);
      return res.status(500).json({ message: "서버 오류 발생", error: err.message });
    }
  }
);
