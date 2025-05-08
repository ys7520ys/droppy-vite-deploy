import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'; // ✅ 이렇게 수정
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ✅ 배너 수정 모달
const EditBannerModal = ({ localData, onChange, onClose }) => {
  const [localTitle, setLocalTitle] = useState(localData.title || "");
  const [localSubTitle, setLocalSubTitle] = useState(localData.subTitle || "");
  const [textAlign, setTextAlign] = useState(localData.align || "center");
  const [mediaSrc, setMediaSrc] = useState(localData.mediaUrl || "");
  const [fileType, setFileType] = useState(localData.mediaType || "video");
  const [localButtonText, setLocalButtonText] = useState(localData.buttonText || "지금 문의하기");

  useEffect(() => {
    onChange?.({
      title: localTitle,
      subTitle: localSubTitle,
      align: textAlign,
      mediaUrl: mediaSrc,
      mediaType: fileType,
      buttonText: localButtonText,
    });
  }, [localTitle, localSubTitle, textAlign, mediaSrc, fileType, localButtonText]);

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setMediaSrc(previewURL);

    const detectedType = file.type.includes("image") ? "image" : "video";
    setFileType(detectedType);

    const fileRef = ref(storage, `banner04/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setMediaSrc(url);
    setFileType(detectedType);
  };

  const getButtonStyle = (value) => ({
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: textAlign === value ? "#007bff" : "#f0f0f0",
    color: textAlign === value ? "white" : "black",
    flex: 1,
  });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: 100,
        left: 100,
        background: "#fff",
        padding: 20,
        border: "1px solid #ccc",
        zIndex: 9999,
        maxWidth: 500,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginBottom: 20 }}>배너 수정</h3>

      <label>제목</label>
      <textarea
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        placeholder="제목 입력"
        rows={2}
        style={{ width: "100%", marginBottom: 15, padding: 8 }}
      />

      <label>서브제목</label>
      <textarea
        value={localSubTitle}
        onChange={(e) => setLocalSubTitle(e.target.value)}
        placeholder="서브제목 입력"
        rows={2}
        style={{ width: "100%", marginBottom: 15, padding: 8 }}
      />

      <label>버튼 텍스트</label>
      <input
        value={localButtonText}
        onChange={(e) => setLocalButtonText(e.target.value)}
        placeholder="버튼 안에 들어갈 문구 입력"
        style={{ width: "100%", marginBottom: 20, padding: 8 }}
      />

      <label>텍스트 정렬</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button style={getButtonStyle("left")} onClick={() => setTextAlign("left")}>좌측</button>
        <button style={getButtonStyle("center")} onClick={() => setTextAlign("center")}>가운데</button>
        <button style={getButtonStyle("right")} onClick={() => setTextAlign("right")}>우측</button>
      </div>

      <label>배경 이미지/영상 업로드</label>
      <input type="file" accept="image/*,video/mp4" onChange={handleMediaUpload} style={{ marginBottom: 10 }} />

      <input
        type="text"
        value={mediaSrc}
        onChange={(e) => {
          const value = e.target.value;
          setMediaSrc(value);
          const inferredType = value.includes(".mp4") ? "video" : "image";
          setFileType(inferredType);
        }}
        placeholder="직접 URL 입력 (선택)"
        style={{ width: "100%", marginBottom: 20, padding: 8 }}
      />

      <button
        onClick={onClose}
        style={{
          marginTop: 10,
          width: "100%",
          padding: 10,
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        닫기
      </button>
    </div>
  );
};

// ✅ TpBanner04 메인 컴포넌트
const TpBanner04 = ({ title, subTitle, align, mediaUrl, mediaType, buttonText, onUpdate, isPreview = false }) => {
  const sectionRef = useRef(null);
  const [bannerData, setBannerData] = useState({
    title: title || "건강한 하루의 시작",
    subTitle: subTitle || "신선한 재료로 만들어지는 건강한 습관",
    align: align || "center",
    mediaUrl: mediaUrl || "videos/1757799-hd_1920_1080_25fps.mp4",
    mediaType: mediaType || "video",
    buttonText: buttonText || "지금 문의하기",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    onUpdate?.(bannerData);
  }, []);

  // ✅ 반응형 클래스 적용
  useEffect(() => {
    const updateResponsiveClass = () => {
      if (!sectionRef.current) return;
      const width = sectionRef.current.clientWidth;
      sectionRef.current.classList.remove("is-mobile", "is-tablet", "is-pc");
      if (width <= 768) {
        sectionRef.current.classList.add("is-mobile");
      } else if (width <= 1200) {
        sectionRef.current.classList.add("is-tablet");
      } else {
        sectionRef.current.classList.add("is-pc");
      }
    };

    updateResponsiveClass();
    window.addEventListener("resize", updateResponsiveClass);
    return () => window.removeEventListener("resize", updateResponsiveClass);
  }, []);

  // ✅ ScrollTrigger 애니메이션
  useLayoutEffect(() => {
    if (!sectionRef.current || editing) return;
    const ctx = gsap.context(() => {
      gsap.from(".tpBanner04__text .title", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [editing]);

  return (
    <section
      className="tpBanner04"
      ref={sectionRef}
      onClick={() => {
        if (!isPreview) setEditing(true);
      }}
    >
      {bannerData.mediaType === "video" ? (
        <video
          key={bannerData.mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="tpBanner04__background"
        >
          <source src={bannerData.mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="tpBanner04__background"
          style={{ backgroundImage: `url(${bannerData.mediaUrl})` }}
        />
      )}

      <div className="tpBanner04__text" style={{ textAlign: bannerData.align }}>
        <h2 className="title">
          {bannerData.title.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <p className="subTitle">
          {bannerData.subTitle.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <button className="btn">{bannerData.buttonText}</button>
      </div>

      {editing && (
        <EditBannerModal
          localData={bannerData}
          onChange={(newData) => {
            setBannerData(newData);
            onUpdate?.(newData);
          }}
          onClose={() => setEditing(false)}
        />
      )}
    </section>
  );
};

export default TpBanner04;



