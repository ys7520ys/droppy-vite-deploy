// TpLogoInfiniteSlider.jsx (무한 슬라이딩 + 클릭 편집 가능)
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'; // ✅ 이렇게 수정

const TpLogoInfiniteSlider = () => {
  const [logos, setLogos] = useState([
    { id: 1, name: "L.POINT", url: "https://via.placeholder.com/100x50" },
    { id: 2, name: "Nexon", url: "https://via.placeholder.com/100x50" },
    { id: 3, name: "N Pay", url: "https://via.placeholder.com/100x50" },
    { id: 4, name: "OK Cashback", url: "https://via.placeholder.com/100x50" },
    { id: 5, name: "Payco", url: "https://via.placeholder.com/100x50" },
    { id: 6, name: "Shinhan Card", url: "https://via.placeholder.com/100x50" },
  ]);
  const [editingLogo, setEditingLogo] = useState(null);

  const updateLogo = (updated) => {
    setLogos((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const handleFileUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileRef = ref(storage, `logos/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    updateLogo({ ...editingLogo, url });
  };

  return (
    <section className="tpLogoInfiniteSlider" style={{ overflow: "hidden", padding: 140, background: "#fff" }}>
      <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 30 }}>머니트리와 함께 비즈니스를 확장하세요!</h2>
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          style={{ background: "#111", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none" }}
        >
          제휴/광고 알아보기
        </button>
      </p>
      <div
        className="slider-track"
        style={{
          display: "flex",
          gap: 140,
          marginTop: 100,
          whiteSpace: "nowrap",
          animation: "scroll 40s linear infinite",
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            style={{ flex: "0 0 auto", cursor: "pointer" }}
            onClick={() => setEditingLogo(logo)}
          >
            <img src={logo.url} alt={logo.name} style={{ height: 50, objectFit: "contain" }} />
          </div>
        ))}
      </div>

      {/* 스타일 */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {editingLogo && (
        <div style={{ position: "fixed", top: 100, left: 100, background: "#fff", padding: 20, border: "1px solid #ccc", zIndex: 9999 }}>
          <h3>로고 수정</h3>
          <input
            type="text"
            value={editingLogo.name}
            onChange={(e) => updateLogo({ ...editingLogo, name: e.target.value })}
            placeholder="브랜드명"
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            type="text"
            value={editingLogo.url}
            onChange={(e) => updateLogo({ ...editingLogo, url: e.target.value })}
            placeholder="이미지 주소"
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, editingLogo.id)} />
          <br />
          <button onClick={() => setEditingLogo(null)} style={{ marginTop: 10 }}>닫기</button>
        </div>
      )}
    </section>
  );
};

export default TpLogoInfiniteSlider;
