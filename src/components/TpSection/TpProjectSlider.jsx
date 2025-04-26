// ✅ TpProjectSlider.jsx (수정 모달 + 슬라이드 추가 + 수동 드래그 + 끝 가리기 버전)
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const defaultData = [
  {
    imageUrl: "https://via.placeholder.com/600x400?text=Project+1",
    titleEn: "Seocho pruzio sermit",
    titleKo: "대우서초 푸르지오써밋",
    year: "2022",
    type: "Apartment",
  },
  {
    imageUrl: "https://via.placeholder.com/600x400?text=Project+2",
    titleEn: "Mapo Culture Center",
    titleKo: "마포 문화센터",
    year: "2023",
    type: "Public",
  },
  {
    imageUrl: "https://via.placeholder.com/600x400?text=Project+3",
    titleEn: "Gangnam Office Tower",
    titleKo: "강남 오피스 타워",
    year: "2021",
    type: "Office",
  },
];

const TpProjectSlider = ({ data = defaultData, onUpdate }) => {
  const [slides, setSlides] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editItem, setEditItem] = useState({});

  const openModal = (index) => {
    setEditingIndex(index);
    setEditItem({ ...slides[index] });
  };

  const closeModal = () => {
    setEditingIndex(null);
    setEditItem({});
  };

  const handleChange = (key, value) => {
    setEditItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditItem((prev) => ({ ...prev, imageUrl: url }));
  };

  const saveChanges = () => {
    const updated = [...slides];
    updated[editingIndex] = editItem;
    setSlides(updated);
    if (onUpdate) onUpdate({ data: updated });
    closeModal();
  };

  const handleAddSlide = () => {
    const newSlide = {
      imageUrl: "https://via.placeholder.com/600x400?text=New+Project",
      titleEn: "New Project",
      titleKo: "새 프로젝트",
      year: "2025",
      type: "New",
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    if (onUpdate) onUpdate({ data: updated });
  };

  return (
    <section className="tpProjectSlider" style={{ padding: "60px", background: "#fff", overflow: "hidden" }}>
      <h2 style={{ fontSize: "40px", marginBottom: "30px" }}>Recent Projects</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={"auto"}
        navigation
        style={{ overflow: "visible", paddingBottom: "40px" }}
      >
        {slides.map((item, idx) => (
          <SwiperSlide key={idx} style={{ width: "650px" }}>
            <div
              onClick={() => openModal(idx)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.imageUrl}
                alt={item.titleEn}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <div style={{ marginTop: "16px", fontSize: "16px" }}>
                <strong>{item.titleEn}</strong>
                <div>{item.titleKo}</div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "4px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <span>{item.year}</span>
                  <span>{item.type}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 슬라이드 추가 버튼 */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleAddSlide}
          style={{
            padding: "12px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          + 슬라이드 추가하기
        </button>
      </div>

      {/* 수정 모달 */}
      {editingIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 24,
              borderRadius: 12,
              width: "90%",
              maxWidth: 400,
            }}
          >
            <h3 style={{ marginBottom: 16 }}>프로젝트 수정</h3>

            <label>영문 제목</label>
            <input
              value={editItem.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <label>한글 제목</label>
            <input
              value={editItem.titleKo}
              onChange={(e) => handleChange("titleKo", e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <label>연도</label>
            <input
              value={editItem.year}
              onChange={(e) => handleChange("year", e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <label>타입</label>
            <input
              value={editItem.type}
              onChange={(e) => handleChange("type", e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <label>이미지 업로드</label>
            <input type="file" onChange={handleImageUpload} style={{ marginBottom: 16 }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={saveChanges}>저장</button>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TpProjectSlider;