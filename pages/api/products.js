const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    // Request products from stripe using our Stripe Secret Key
    const products = await stripe.products.list({
      limit: 100,
    });

    res.json(products).status(200);
  } catch (err) {
    res.json({ message: err.message }).status(500);
  }
}
