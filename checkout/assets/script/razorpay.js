import { createPayment, verifyPayment } from "./payments.api.js";

const RAZORPAY_KEY_ID = "rzp_live_SCTk8MVHczLOTq";

const razorpayCheckout = async ({ amount, planId, userId }) => {
  try {
    const createPaymentResponse = await createPayment({ planId, userId });

    if (!createPaymentResponse.success) {
      alert("Failed to create payment");
      return;
    }

    const { id: order_id } = createPaymentResponse.data;

    const RAZORPAY_OPTIONS = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "LyfTag",
      description: "LyfTag Subscription",
      order_id,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
          
        const verifyResponse = await verifyPayment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount,
          plan: planId,
          userId,
        });

        if (verifyResponse.success) {
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },
    };

    const rzp = new Razorpay(RAZORPAY_OPTIONS);
    rzp.open();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export default razorpayCheckout;
