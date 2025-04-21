import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";

const LoginPage = ({ setUser }) => { // ✅ props로 setUser 받아옴
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = result.user;

      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        isAdmin: false, // 임시: Firestore에서 따로 불러오는 게 안전해!
      });

      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;

      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        isAdmin: false, // 임시
      });

      alert("Google 계정으로 로그인되었습니다!");
      navigate("/productPage03");
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      alert("구글 로그인에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0px auto", padding: "100px 50px", border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#000", color: "white" }}>
          로그인
        </button>
        <button
          onClick={handleGoogleLogin}
          style={{ width: "100%", padding: 10, marginTop: 12, background: "#4285F4", color: "#fff" }}
        >
          Google 계정으로 로그인
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default LoginPage;

