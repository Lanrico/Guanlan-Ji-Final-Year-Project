import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://127.0.0.1:8081/user/payment/3",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" action="submit-page.html" onSubmit={handleSubmit} target="_blank">
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => {
          console.log(e)
          setEmail(e.value)
        }}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button type="submit" fullWidth disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// export default function CheckoutForm() {
//   const [error, setError] = useState(null);
//   const [paymentComplete, setPaymentComplete] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // 阻止表单的默认提交行为
//     event.preventDefault();

//     // 如果 Stripe 客户端库没有完全加载，则直接返回
//     if (!stripe || !elements) {
//       return;
//     }

//     // 创建一个 PaymentMethod 对象，表示你的客户的付款信息
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       // 处理支付错误
//       setError(error.message);
//       setPaymentComplete(false);
//       return;
//     }

//     // 使用 PaymentIntent 对象创建一个确认付款的请求
//     const response = await fetch('/api/confirm-payment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         paymentMethodId: paymentMethod.id,
//       }),
//     });

//     const result = await response.json();

//     if (result.error) {
//       // 处理支付错误
//       setError(result.error.message);
//       setPaymentComplete(false);
//     } else {
//       // 处理支付成功
//       setError(null);
//       setPaymentComplete(true);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <div className="error">{error}</div>}
//       {paymentComplete && <div className="success">Payment successful!</div>}
//       <button type="submit">Pay</button>
//     </form>
//   );
// };