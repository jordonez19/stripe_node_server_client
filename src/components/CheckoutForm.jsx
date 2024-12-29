import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setFeedbackMessage("Stripe has not loaded yet. Please try again later.");
      return;
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setFeedbackMessage(`Error creating payment method: ${error.message}`);
      return;
    }

    const payload = {
      id: paymentMethod.id,
      amount: 2500, // Amount in cents
      description: "Gaming Mouse",
    };

    try {
      const response = await axios.post(
        "http://localhost:3005/checkout",
        payload
      );

      if (response.data.payment) {
        setFeedbackMessage("Payment successful! Thank you for your purchase.");
        //elements.getElement(CardElement).clear();
      } else {
        setFeedbackMessage("Payment failed. Please try again.");
      }
    } catch (err) {
      setFeedbackMessage(
        `Server error: ${
          err.response?.data?.error?.raw?.message || response.message
        }`
      );
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Checkout Form</h1>
      {feedbackMessage && (
        <div className="feedback-message text-center text-danger mt-4">
          <p>{feedbackMessage}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        action=""
        className="p-4 w-75 mx-auto card text-center"
      >
        <h4 className="mt-2 mb-4">Valor: $25.000</h4>
        <img
          className="mx-auto"
          width={150}
          src="https://www.steren.com.co/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/21364eb0d/mouse-inalambrico-800-1200-1600-dpi-con-acabado-tipo-piel.jpg"
          alt="mouse"
        />
        <CardElement className="mt-5 mb-2" />
        <br />
        <button disabled={stripe} className="btn btn-primary" type="sumbit">
          Buy
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
