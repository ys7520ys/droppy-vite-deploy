// const functions = require("firebase-functions");
// const fetch = require("node-fetch"); // 설치 필요: npm install node-fetch@2
// require("dotenv").config();

// // 환경변수는 .env 파일에서 가져오거나, Firebase 환경 설정에서 설정해도 됨
// const SITE_ID = "당신의_Site_ID";
// const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
// const BUILD_HOOK = "https://api.netlify.com/build_hooks/당신의_빌드_훅_ID";

// // ✅ 실제 함수 등록
// exports.deploy = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

//   const { domain, orderId } = req.body;

//   const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//   try {
//     // 1. Netlify 도메인 연결
//     const domainRes = await fetch(NETLIFY_API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     const result = await domainRes.json();

//     if (!domainRes.ok) {
//       console.error("🔥 Netlify 도메인 연결 실패:", result);
//       return res.status(500).json({ success: false, message: result.message || "Netlify 도메인 연결 실패" });
//     }

//     // 2. Netlify 빌드 훅 호출
//     await fetch(BUILD_HOOK, { method: "POST" });

//     return res.status(200).json({ success: true, message: "도메인 연결 및 배포 성공!" });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: "서버 오류" });
//   }
// });


















// const functions = require("firebase-functions");
// const fetch = require("node-fetch"); // 설치 필요: npm install node-fetch@2

// // ✅ Netlify 정보 (입력해야 할 값들)
// const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121";
// const BUILD_HOOK = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";
// const NETLIFY_TOKEN = functions.config().netlify.token; // Firebase 환경 변수 사용

// // ✅ Gen 1 Functions로 명시
// exports.autoDeploy = functions.region("us-central1").https.onRequest(async (req, res) => {
//   if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

//   const { domain, orderId } = req.body;

//   const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//   try {
//     // 1. Netlify 도메인 연결
//     const domainRes = await fetch(NETLIFY_API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${NETLIFY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     const result = await domainRes.json();

//     if (!domainRes.ok) {
//       console.error("🔥 Netlify 도메인 연결 실패:", result);
//       return res.status(500).json({
//         success: false,
//         message: result.message || "Netlify 도메인 연결 실패",
//       });
//     }

//     // 2. Netlify 빌드 훅 호출
//     await fetch(BUILD_HOOK, { method: "POST" });

//     return res.status(200).json({
//       success: true,
//       message: "도메인 연결 및 배포 성공!",
//     });
//   } catch (err) {
//     console.error("🔥 오류 발생:", err);
//     return res.status(500).json({ success: false, message: "서버 오류" });
//   }
// });






// const functions = require("firebase-functions");
// const fetch = require("node-fetch"); // 이미 설치되어 있으면 생략
// const cors = require('cors')({ origin: true }); // CORS 미들웨어 추가

// // ✅ Netlify 정보 (입력해야 할 값들)
// const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121";
// const BUILD_HOOK = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";
// const NETLIFY_TOKEN = functions.config().netlify.token; // Firebase 환경 변수 사용
// // ✅ Gen 1 Functions로 명시
// exports.autoDeploy = functions.region("us-central1").https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

//     const { domain, orderId } = req.body;

//     const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//     try {
//       // 1. Netlify 도메인 연결
//       const domainRes = await fetch(NETLIFY_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: domain }),
//       });

//       const result = await domainRes.json();

//       if (!domainRes.ok) {
//         console.error("🔥 Netlify 도메인 연결 실패:", result);
//         return res.status(500).json({
//           success: false,
//           message: result.message || "Netlify 도메인 연결 실패",
//         });
//       }

//       // 2. Netlify 빌드 훅 호출
//       await fetch(BUILD_HOOK, { method: "POST" });

//       return res.status(200).json({
//         success: true,
//         message: "도메인 연결 및 배포 성공!",
//       });
//     } catch (err) {
//       console.error("🔥 오류 발생:", err);
//       return res.status(500).json({ success: false, message: "서버 오류" });
//     }
//   });
// });


// const functions = require('firebase-functions');
// const cors = require('cors')({ origin: true }); // CORS 설정
// const fetch = require('node-fetch'); // 이미 설치된 패키지

// const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121";
// const BUILD_HOOK = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";
// const NETLIFY_TOKEN = functions.config().netlify.token; // Firebase 환경 변수 사용

// // ✅ CORS 미들웨어를 사용하여 모든 요청을 처리할 수 있게 해줌
// exports.autoDeploy = functions.https.onRequest((req, res) => {
//   // CORS 처리
//   cors(req, res, async () => {
//     if (req.method !== 'POST') {
//       return res.status(405).send('Method Not Allowed');
//     }

//     const { domain, orderId } = req.body;
//     const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//     try {
//       // Netlify 도메인 연결
//       const domainRes = await fetch(NETLIFY_API, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: domain }),
//       });

//       const result = await domainRes.json();

//       if (!domainRes.ok) {
//         console.error('🔥 Netlify 도메인 연결 실패:', result);
//         return res.status(500).json({ success: false, message: result.message || 'Netlify 도메인 연결 실패' });
//       }

//       // Netlify 빌드 훅 호출
//       await fetch(BUILD_HOOK, { method: 'POST' });

//       return res.status(200).json({
//         success: true,
//         message: '도메인 연결 및 배포 성공!',
//       });
//     } catch (err) {
//       console.error('🔥 오류 발생:', err);
//       return res.status(500).json({ success: false, message: '서버 오류' });
//     }
//   });
// });





// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const fetch = require("node-fetch");

// // ✅ Firebase 환경 변수로 등록된 시크릿
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121"; // Netlify 사이트 ID
// const BUILD_HOOK = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24"; // Netlify 빌드 훅

// exports.autoDeploy = onRequest(
//   { cors: true, secrets: [NETLIFY_TOKEN] }, // ✅ secrets 배열에 명시!
//   async (req, res) => {
//     const origin = req.get("origin");
//     const allowedOrigins = [
//       "http://localhost:3000",
//       "https://droppy.kr",
//     ];

//     if (allowedOrigins.includes(origin) || (origin && origin.endsWith(".droppy.kr"))) {
//       res.set("Access-Control-Allow-Origin", origin);
//     } else {
//       res.set("Access-Control-Allow-Origin", "*");
//     }
//     res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

//     if (req.method === "OPTIONS") {
//       return res.status(204).send();
//     }

//     if (req.method !== "POST") {
//       return res.status(405).json({ success: false, message: "Method Not Allowed" });
//     }

//     const { domain, orderId } = req.body || {};
//     if (!domain || !orderId) {
//       return res.status(400).json({ success: false, message: "필수 파라미터 누락: domain 또는 orderId" });
//     }

//     const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}/domains`;

//     try {
//       // ✅ 도메인 등록 요청
//       const domainRes = await fetch(NETLIFY_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: domain }),
//       });

//       const result = await domainRes.json();

//       if (!domainRes.ok) {
//         logger.error("🔥 Netlify 도메인 연결 실패:", result);
//         return res.status(500).json({
//           success: false,
//           message: result.message || "Netlify 도메인 연결 실패",
//         });
//       }

//       // ✅ 빌드 트리거 실행
//       await fetch(BUILD_HOOK, { method: "POST" });

//       return res.status(200).json({
//         success: true,
//         message: "도메인 연결 및 배포 성공!",
//       });

//     } catch (err) {
//       logger.error("🔥 서버 오류 발생:", err);
//       return res.status(500).json({ success: false, message: "서버 오류 발생" });
//     }
//   }
// );




const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const fetch = require("node-fetch");

// ✅ Firebase 콘솔에서 등록한 시크릿 토큰
const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// ✅ Netlify 정보
const SITE_ID = "d7d9b502-89e7-4c89-b87f-2543c5d94121";
const BUILD_HOOK = "https://api.netlify.com/build_hooks/68220dba4690e1009bf78a24";

// ✅ SaaS 방식 자동 배포 함수
exports.autoDeploy = onRequest(
  {
    cors: true,
    secrets: [NETLIFY_TOKEN],
  },
  async (req, res) => {
    const origin = req.get("origin");
    logger.info("🧪 요청 origin:", origin);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "https://droppy.kr",
    ];

    // ✅ CORS 처리
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".droppy.kr")) {
      res.set("Access-Control-Allow-Origin", origin || "*");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      if (req.method === "OPTIONS") {
        logger.info("📡 OPTIONS 요청 처리");
        return res.status(204).send();
      }
    } else {
      logger.warn("⛔ 허용되지 않은 origin:", origin);
      return res.status(403).json({
        success: false,
        message: "허용되지 않은 도메인",
        origin,
      });
    }

    // ✅ POST가 아니면 차단
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { domain, orderId } = req.body || {};
    if (!domain || !orderId) {
      logger.warn("⚠️ 누락된 파라미터:", { domain, orderId });
      return res.status(400).json({
        success: false,
        message: "필수 파라미터 누락: domain 또는 orderId",
      });
    }

    logger.info("📦 도메인 연결 시도:", domain);
    logger.info("📦 주문 ID:", orderId);

    const NETLIFY_API = `https://api.netlify.com/api/v1/sites/${SITE_ID}`;

    try {
      // ✅ 도메인 등록: PATCH 방식으로 custom_domain 설정
      const response = await fetch(NETLIFY_API, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ custom_domain: domain }),
      });

      const result = await response.json();
      logger.info("📦 Netlify 응답 결과:", result);

      if (!response.ok) {
        logger.error("❌ 도메인 연결 실패:", result);
        return res.status(500).json({
          success: false,
          message: result.message || "Netlify 도메인 연결 실패",
        });
      }

      // ✅ 빌드 트리거
      await fetch(BUILD_HOOK, { method: "POST" });

      return res.status(200).json({
        success: true,
        message: "도메인 연결 및 배포 성공!",
      });

    } catch (err) {
      logger.error("🔥 서버 오류 발생:", err);
      return res.status(500).json({
        success: false,
        message: "서버 내부 오류",
        error: err.message,
      });
    }
  }
);
