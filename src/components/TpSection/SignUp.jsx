// ✅ SignupPage.jsx (Firebase 이메일/비밀번호 회원가입 기능)
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUpSection01 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err);
      setError("이미 가입된 이메일이거나 비밀번호가 약합니다.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0px auto", padding: "100px 50px", border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
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
          placeholder="비밀번호 (6자 이상)"
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#000", color: "white" }}>
          회원가입
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default SignUpSection01;
