import React from "react";
import { tpBanner03 } from "../../constants/data/tpBanner";

const TpBanner03 = () => {
  return (
    <section className="tpBanner03">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="tpBanner03__background"
      >
        <source src="videos/1757799-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="tpBanner03__text">
        <h2 className="title">
          {tpBanner03.banner_text.title}
        </h2>
        <p className="subTitle">
          {tpBanner03.banner_text.subTitle}
        </p>
        <button className="btn">
          지금 문의하기
        </button>
      </div>

    </section>
  );
};

export default TpBanner03;
