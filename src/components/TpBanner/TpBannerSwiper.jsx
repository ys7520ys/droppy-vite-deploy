// TpBannerSwiper.jsx (수정 완료: 이미지 비율 + 영상 커버 + 업로드 반영 오류 수정)
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import "swiper/css";

const EditSlideModal = ({ slides, editingSlideId, onChange, onClose, setEditingSlideId, onAddSlide }) => {
  const currentSlide = slides.find((s) => s.id === editingSlideId);
  const [localSlide, setLocalSlide] = useState(currentSlide);

  useEffect(() => {
    setLocalSlide(currentSlide);
  }, [currentSlide]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const detectedType = file.type.includes("image") ? "image" : "video";
    const fileRef = ref(storage, `bannerSwiper/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    const updated = { ...localSlide, mediaUrl: url, mediaType: detectedType };
    setLocalSlide(updated);
    onChange(updated);
  };

  const handleChange = (key, value) => {
    const updated = { ...localSlide, [key]: value };
    setLocalSlide(updated);
    onChange(updated);
  };

  if (!localSlide) return null;

  return (
    <div style={{ position: "fixed", top: 100, left: 100, zIndex: 9999, background: "#fff", padding: 20, border: "1px solid #ccc", maxWidth: 500 }}>
      <h3>슬라이드 설정</h3>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {slides.map((s) => (
          <button
            key={s.id}
            onClick={() => setEditingSlideId(s.id)}
            style={{
              padding: "6px 10px",
              background: editingSlideId === s.id ? "#000" : "#eee",
              color: editingSlideId === s.id ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {s.title || `슬라이드 ${s.id}`}
          </button>
        ))}
        <button onClick={onAddSlide} style={{ padding: "6px 10px", background: "#007bff", color: "#fff", border: "none", borderRadius: 4 }}>
          + 추가
        </button>
      </div>

      <input value={localSlide.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="제목" style={{ width: "100%", marginBottom: 10 }} />
      <input value={localSlide.subTitle} onChange={(e) => handleChange("subTitle", e.target.value)} placeholder="서브제목" style={{ width: "100%", marginBottom: 10 }} />
      <input value={localSlide.mediaUrl} onChange={(e) => handleChange("mediaUrl", e.target.value)} placeholder="미디어 URL" style={{ width: "100%", marginBottom: 10 }} />
      <input type="file" accept="image/*,video/*" onChange={handleFileUpload} />

      {localSlide.mediaType === "image" ? (
        <img src={localSlide.mediaUrl} alt="미리보기" style={{ width: "100%", marginTop: 10, objectFit: "cover" }} />
      ) : (
        <video src={localSlide.mediaUrl} controls style={{ width: "100%", marginTop: 10, objectFit: "cover" }} />
      )}

      <button onClick={onClose} style={{ marginTop: 10 }}>닫기</button>
    </div>
  );
};

const TpBannerSwiper = ({ onUpdate }) => {
  const [slides, setSlides] = useState([
    { id: 1, title: "슬라이드 1", subTitle: "설명 1", mediaUrl: "videos/1757799-hd_1920_1080_25fps.mp4", mediaType: "video" },
    { id: 2, title: "슬라이드 2", subTitle: "설명 2", mediaUrl: "https://via.placeholder.com/1280x720", mediaType: "image" },
  ]);
  const [editingSlideId, setEditingSlideId] = useState(null);

  const updateSlide = (updated) => {
    setSlides((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: "새 슬라이드",
      subTitle: "설명 텍스트",
      mediaUrl: "",
      mediaType: "image",
    };
    setSlides((prev) => [...prev, newSlide]);
    setEditingSlideId(newSlide.id);
  };

  useEffect(() => {
    onUpdate?.({ slides });
  }, [slides]);

  return (
    <section className="tpBannerSwiper">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="tpBannerSwiper__container"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} onClick={() => setEditingSlideId(slide.id)}>
            {slide.mediaType === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="tpBannerSwiper__background"
                style={{ width: "100%", height: "100vh", objectFit: "cover" }}
              >
                <source src={slide.mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <div
                className="tpBannerSwiper__background"
                style={{
                  width: "100%",
                  height: "100vh",
                  backgroundImage: `url(${slide.mediaUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div className="tpBannerSwiper__text" style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", textAlign: "center", color: "#fff" }}>
              <h2>{slide.title}</h2>
              <p>{slide.subTitle}</p>
              <button className="btn">지금 문의하기</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {editingSlideId !== null && (
        <EditSlideModal
          slides={slides}
          editingSlideId={editingSlideId}
          setEditingSlideId={setEditingSlideId}
          onChange={updateSlide}
          onAddSlide={handleAddSlide}
          onClose={() => setEditingSlideId(null)}
        />
      )}
    </section>
  );
};

export default TpBannerSwiper;



