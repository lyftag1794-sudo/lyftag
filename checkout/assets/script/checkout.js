// ENTRY POINT FOR CHECKOUT PAGE
import { PLAN_DETAILS, PRICE_PER_PLAN } from "./data.js";
import razorpayCheckout from "./razorpay.js";

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan");

  if (!plan) {
    alert("invalid plan");
    throw new Error("invalid plan");
  }

  return plan;
};

const renderPlanDetails = (plan) => {
  const planDetails = PLAN_DETAILS[plan];
  const planDetailsContainer = document.getElementById("plan-details");
  planDetailsContainer.innerHTML = `
    <h2>${planDetails.title}</h2>
    <p>${planDetails.price}</p>
    <ul>
      ${planDetails.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
  `;
};


document.addEventListener("DOMContentLoaded", () => {
  const plan = getParams();
  renderPlanDetails(plan);
  const checkoutBtn = document.getElementById("checkout-btn");

  checkoutBtn.addEventListener("click", async () => {
    const amount = PRICE_PER_PLAN[plan];
    razorpayCheckout({ amount, planId: plan, userId: "user1" });
  });
});
