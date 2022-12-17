import { loadStripe } from "@stripe/stripe-js";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { stripeKey } = publicRuntimeConfig;

const checkout = async ({ lineItems }) => {
  let stripePromess = null;

  const getStripe = () => {
    if (!stripePromess && stripeKey) {
      stripePromess = loadStripe(stripeKey);
    }
    return stripePromess;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/paiement-valide`,
    cancelUrl: `${window.location.origin}/paiement-annule`,
  });
};

export default checkout;
