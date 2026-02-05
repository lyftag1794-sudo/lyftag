import apiClient from "./apiClient.js";
import { PRICE_PER_PLAN } from "./data.js";

const createPayment = async ({ userId, planId }) => {
  const response = await apiClient("/create-order", {
    body: JSON.stringify({
      amount: PRICE_PER_PLAN[planId],
      userId,
    }),
  });

  return response;
};

const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount,
  plan,
  userId,
}) => {
  const response = await apiClient("/verify-payment", {
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      plan,
      userId,
    }),
  });

  return response;
};

export { createPayment, verifyPayment };
