// ✅ TpBanner04.jsx (미리보기 및 저장 시 즉시 반영)
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const EditBannerModal = ({ title, subTitle, align, mediaUrl, mediaType, onChange, onClose }) => {
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localSubTitle, setLocalSubTitle] = useState(subTitle || "");
  const [textAlign, setTextAlign] = useState(align || "center");
  const [mediaSrc, setMediaSrc] = useState(mediaUrl || "");
  const [type, setType] = useState(mediaType || "video");
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState(mediaType || "video");

  useEffect(() => {
    onChange?.({
      title: localTitle,
      subTitle: localSubTitle,
      align: textAlign,
      mediaUrl: mediaSrc,
      mediaType: fileType,
    });
  }, [localTitle, localSubTitle, textAlign, mediaSrc, fileType]);

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    setMediaSrc(previewURL);
    const detectedType = file.type.includes("image") ? "image" : "video";
    setType(detectedType);
    setFileType(detectedType);

    const fileRef = ref(storage, `banner04/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setMediaSrc(url);
    setType(detectedType);
  };

  const getButtonStyle = (value) => ({
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: textAlign === value ? "#007bff" : "#f0f0f0",
    color: textAlign === value ? "white" : "black"
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
        maxWidth: 500
      }}
    >
      <h3>배너 텍스트 수정</h3>
      <textarea
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        placeholder="제목 (줄바꿈 가능)"
        rows={2}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <textarea
        value={localSubTitle}
        onChange={(e) => setLocalSubTitle(e.target.value)}
        placeholder="서브제목"
        style={{ width: "100%", marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button style={getButtonStyle("left")} onClick={() => setTextAlign("left")}>좌측</button>
        <button style={getButtonStyle("center")} onClick={() => setTextAlign("center")}>중앙</button>
        <button style={getButtonStyle("right")} onClick={() => setTextAlign("right")}>
          우측
        </button>
      </div>

      <input type="file" accept="image/*,video/mp4" onChange={handleMediaUpload} />
      <input
        type="text"
        value={mediaSrc}
        onChange={(e) => {
          const value = e.target.value;
          setMediaSrc(value);
          const inferredType = value.includes(".mp4") ? "video" : "image";
          setType(inferredType);
          setFileType(inferredType);
        }}
        placeholder="이미지 또는 영상 경로 입력 (예: /videos/test.mp4)"
        style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
      />

      {preview && type === "image" && (
        <img src={preview} alt="미리보기 이미지" style={{ width: "100%", maxHeight: 200, objectFit: "contain", marginBottom: 10 }} />
      )}
      {preview && type === "video" && (
        <video src={preview} controls style={{ width: "100%", maxHeight: 200, objectFit: "contain", marginBottom: 10 }} />
      )}

      <button onClick={onClose} style={{ marginTop: 10 }}>닫기</button>
    </div>
  );
};

const TpBanner04 = ({ onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [bannerData, setBannerData] = useState({
    title: "건강한 하루의 시작",
    subTitle: "신선한 재료로 만들어지는 건강한 습관",
    align: "center",
    mediaUrl: "videos/1757799-hd_1920_1080_25fps.mp4",
    mediaType: "video"
  });

  useEffect(() => {
    onUpdate?.(bannerData);
  }, [bannerData]);

  return (
    <section className="tpBanner04" onClick={() => setEditing(true)}>
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
          style={{
            backgroundImage: `url(${bannerData.mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: "brightness(80%)"
          }}
        />
      )}

      <div className="tpBanner04__text" style={{ textAlign: bannerData.align }}>
        <h2 className="title">{bannerData.title}</h2>
        <p className="subTitle">{bannerData.subTitle}</p>
        <button className="btn">지금 문의하기</button>
      </div>

      {editing && (
        <EditBannerModal
          title={bannerData.title}
          subTitle={bannerData.subTitle}
          align={bannerData.align}
          mediaUrl={bannerData.mediaUrl}
          mediaType={bannerData.mediaType}
          onChange={(newData) => setBannerData(newData)}
          onClose={() => setEditing(false)}
        />
      )}
    </section>
  );
};

export default TpBanner04;
