import React from "react";

const VideoBanner = () => {
  return (
    <div className="video-banner">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src="   videos/1757799-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="video-text">
        <h1>신뢰가 생기는<br/>파트너를 찾고 계신가요?</h1>
        <p>원하시는 작업내용과 일정들을 알려주세요.<br/>빠른 시일 내로 도와드리겠습니다.</p>
      </div>
    </div>
  );
};

export default VideoBanner;
