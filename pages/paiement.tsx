import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Molecules/CheckoutForm/CheckoutForm";
import getConfig from "next/config";
import { useCartStore } from "../contexts/cartStore";
import styles from "../styles/Payment.module.scss";

const { publicRuntimeConfig } = getConfig();

const { stripeKey } = publicRuntimeConfig;

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
    <main className={styles.container}>
      <h1>Paiement de votre commande</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
};

export default Payment;
