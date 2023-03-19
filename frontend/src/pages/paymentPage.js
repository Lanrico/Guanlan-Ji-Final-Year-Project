import React from "react";
import PageTemplate from "../components/pageTemplate";
import PaymentStepper from "../components/paymentStepper";
import AuthWrapper from "../components/userProfileInfo/pages/authentication/AuthWrapper";
const PaymentPage = (props) => {

  return (
    <PageTemplate>
      <AuthWrapper>
        <PaymentStepper></PaymentStepper>
      </AuthWrapper>
    </PageTemplate>
  )
}

export default PaymentPage;