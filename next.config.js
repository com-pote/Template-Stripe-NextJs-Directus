/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["marlene.compote.me", "plus.unsplash.com", "retail-chain.fr"],
    // domains: ["files.stripe.com"],
  },
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
    stripeKey: process.env.STRIPE_PUBLIC_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeBaseURL: process.env.STRIPE_BASE_URL,
  },
};

module.exports = nextConfig;
