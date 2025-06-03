export default async function handler(req, res) {
  const { exec } = require("child_process");

  exec("npm run autobuild", (err, stdout, stderr) => {
    if (err) {
      console.error("❌ autobuild 실패:", err);
      return res.status(500).json({ message: "Build failed" });
    }
    console.log("✅ autobuild 성공:\n", stdout);
    res.status(200).json({ message: "Build complete" });
  });
}
