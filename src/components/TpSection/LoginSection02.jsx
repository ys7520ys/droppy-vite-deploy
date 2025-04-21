// NaverLogin.jsx
import React, { useEffect } from "react";

const NaverLogin = () => {
  useEffect(() => {
    const naverScriptLoad = () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
        isPopup: false,
        loginButton: { color: "green", type: 3, height: 60 },
      });

      naverLogin.init();
    };

    // SDK가 이미 로드되어 있으면 실행
    if (window.naver) {
      naverScriptLoad();
    }
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
