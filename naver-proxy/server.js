// // naver-proxy/server.js
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors()); // 모든 요청 허용

// app.get("/naver/me", async (req, res) => {
//     const accessToken = req.headers.authorization?.split(" ")[1];
  
//     try {
//       const response = await axios.get("https://openapi.naver.com/v1/nid/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       res.json(response.data);
//     } catch (error) {
//       console.error("❌ 네이버 사용자 정보 요청 실패:", error.message);
//       res.status(500).json({ error: "사용자 정보를 가져오지 못했습니다." });
//     }
//   });

// app.listen(4000, () => {
//   console.log("✅ 프록시 서버 실행 중 → http://localhost:4000");
// });





// ✅ naver-proxy/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ 기존: 사용자 정보
app.get("/naver/me", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    const response = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ 사용자 정보 요청 실패:", error.message);
    res.status(500).json({ error: "사용자 정보를 가져오지 못했습니다." });
  }
});

// ✅ 기존: Geocode 주소 검색
app.get("/naver/geocode", async (req, res) => {
  const query = req.query.query;
  
  if (!query) {
    return res.status(400).json({ error: "query 파라미터가 필요합니다." });
  }

  try {
    const response = await axios.get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode", {
      params: { query },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "👉여기에_Client_ID",
        "X-NCP-APIGW-API-KEY": "👉여기에_Client_Secret",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ 주소 검색 실패:", error.message);
    res.status(500).json({ error: "주소 검색에 실패했습니다." });
  }
});

// ✅ 추가: Place 검색 (장소명 검색)
app.get("/naver/place", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "query 파라미터가 필요합니다." });
  }

  try {
    const response = await axios.get("https://naveropenapi.apigw.ntruss.com/map-place/v1/search", {
      params: { query },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "qwqkdfesil",
        "X-NCP-APIGW-API-KEY": "BFI3xJYzkCv32hqyANNnu3sr6Ef6u6OvQaV41esb",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ 장소 검색 실패:", error.message);
    res.status(500).json({ error: "장소 검색에 실패했습니다." });
  }
});

// ✅ 서버 실행
app.listen(4000, () => {
  console.log("✅ 프록시 서버 실행 중 → http://localhost:4000");
});

