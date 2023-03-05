import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Molecules/CheckoutForm/CheckoutForm";
import getConfig from "next/config";
import { useCartStore } from "../contexts/cartStore";

const { publicRuntimeConfig } = getConfig();

const { stripeKey } = publicRuntimeConfig;

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(stripeKey);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  const options = {
    clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
