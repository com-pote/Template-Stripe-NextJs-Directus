import { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "../../Interfaces/ICartItem";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cart: ICartItem[]) => {
  let totalCost = 0;
  cart.map((cartItem: ICartItem) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].price_url === cartItem.price_url) {
        totalCost += cart[i].price * cartItem.quantity;
      }
    }
  });

  return totalCost * 100;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cart } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cart),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
