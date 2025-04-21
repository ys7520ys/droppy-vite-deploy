// naver-proxy/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // 모든 요청 허용

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
      console.error("❌ 네이버 사용자 정보 요청 실패:", error.message);
      res.status(500).json({ error: "사용자 정보를 가져오지 못했습니다." });
    }
  });

app.listen(4000, () => {
  console.log("✅ 프록시 서버 실행 중 → http://localhost:4000");
});
