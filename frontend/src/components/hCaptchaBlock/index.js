import React from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCaptchaBlock = (props) => {
  const onVerifyCaptcha = (token) => {
    props.getToken(token);
  }
  return (
    <div style={{ margin: "auto" }}>
      <HCaptcha sitekey="675f7d08-c40c-4ff2-9dd9-c3637bd4ce59" onVerify={onVerifyCaptcha} />
    </div>
  );
}

export default HCaptchaBlock;