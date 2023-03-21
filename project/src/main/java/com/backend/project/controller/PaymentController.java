package com.backend.project.controller;

import java.nio.file.Paths;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import com.stripe.exception.StripeException;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class PaymentController {
  private static Gson gson = new Gson();

  static class CreatePayment {
    @SerializedName("items")
    Object[] items;

    public Object[] getItems() {
      return items;
    }
  }

  ;

  static class CreatePaymentResponse {
    private String clientSecret;

    public CreatePaymentResponse(String clientSecret) {
      this.clientSecret = clientSecret;
    }
  }

  static int calculateOrderAmount(Object[] items) {
// Replace this constant with a calculation of the order's amount
// Calculate the order total on the server to prevent
// people from directly manipulating the amount on the client
    return 500;
  }

  static {
    Stripe.apiKey = "sk_test_51MAKbpLpoycbLqj9CwxBc5geFcnOqB5GxDJ7NLZFVfSSQstLJi8DgFVQ2jaV5cfT1gzNpY4sVVMoY5IfyNzkZPDj00guRDQxuX";
  }

  @PostMapping("/create-payment-intent")
  public String createPaymentIntent(@RequestBody String body) throws StripeException {
    CreatePayment postBody = gson.fromJson(body, CreatePayment.class);
    PaymentIntentCreateParams params =
        PaymentIntentCreateParams.builder()
            .setAmount((long) calculateOrderAmount(postBody.getItems()))
            .setCurrency("eur")
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods
                    .builder()
                    .setEnabled(true)
                    .build()
            )
            .build();
    PaymentIntent paymentIntent = PaymentIntent.create(params);

    CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret());
    return gson.toJson(paymentResponse);
  }
}