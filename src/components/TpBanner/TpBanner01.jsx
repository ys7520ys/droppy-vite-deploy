import React from "react";
import { tpBanner01 } from "../../constants/data/tpBanner";

const TpBanner01 = () => {
  return (
    <section className="tpBanner01">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="tpBanner01__background"
      >
        <source src="videos/1757799-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="tpBanner01__text">
        <h2 className="title">
          {tpBanner01.banner_text.title}
        </h2>
      </div>
    </section>
  );
};

export default TpBanner01;
