import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(id);

  res.send(paymentIntent);
}
