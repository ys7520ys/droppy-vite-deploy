// components/NaverLoginButton.jsx
import React, { useEffect } from "react";

const NaverLoginButton = () => {
  useEffect(() => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 50 },
    });

    naverLogin.init();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLoginButton;
