/*import { loadStripe } from "@stripe/stripe-js";

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
};*/

import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "./supabase";

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const SUPABASE_FUNCTION_URL = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1`;

export const createCheckoutSession = async (productId, cantidad, customerData) => {
  try {
    const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-checkout-session`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Si tienes autenticación habilitada, agrega el token:
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ 
        productId, 
        cantidad, 
        customer: customerData 
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || "Error al crear sesión de pago");
    }

    return data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

export const redirectToCheckout = async (productId, cantidad, customerData) => {
  try {
    const stripe = await stripePromise;
    const { sessionId, url } = await createCheckoutSession(productId, cantidad, customerData);
    
    // Redirigir a Stripe
    if (url) {
      window.location.href = url;
    } else if (sessionId) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    }
  } catch (error) {
    console.error("Error redirecting to checkout:", error);
    alert(error.message || "Error al procesar el pago");
    throw error;
  }
};
