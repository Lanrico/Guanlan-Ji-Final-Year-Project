import React from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCaptchaBlock = (props) => {
  const onVerifyCaptcha = (token) => {
    props.getToken(token);
  }
  return (
    <div style={{ margin: "auto" }}>
      <HCaptcha sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY} onVerify={onVerifyCaptcha} languageOverride={"en"} />
    </div>
  );
}

export default HCaptchaBlock;