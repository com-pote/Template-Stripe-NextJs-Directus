import React from "react";
import styles from "./CheckoutForm.module.scss";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../../Atoms/Button/Button";
import Loader from "../Loader/Loader";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Paiement Validé!");
          break;
        case "processing":
          setMessage("En attente.");
          break;
        case "requires_payment_method":
          setMessage("Le paiement n'à pas about, veuillez rééssayer.");
          break;
        default:
          setMessage("Oups une erreur est survenue.");
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
        return_url: "/paiement-valide",
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

  return (
    <form id="payment-form" onSubmit={handleSubmit} className={styles.container}>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        icon={isLoading ? <Loader /> : ""}
        text="Payer Maintenant"
        color="primary"
      />
      {/* Show any error or success messages */}
      {message === "en Attente" && <Loader />}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
