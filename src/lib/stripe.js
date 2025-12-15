import { loadStripe } from "@stripe/stripe-js";

// Carga Stripe
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// URL BASE DE SUPABASE EDGE FUNCTIONS
const SUPABASE_FUNCTION_URL = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1`;

// Crear sesión de checkout
export const createCheckoutSession = async (productId, cantidad, customerData) => {
  const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, cantidad, customerData }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json(); // { id: 'sess_xxxx' }
};

// Redirigir al checkout
export const redirectToCheckout = async (productId, cantidad, customerData) => {
  const stripe = await stripePromise;
  const session = await createCheckoutSession(productId, cantidad, customerData);
  const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
  if (error) console.error(error);
};
