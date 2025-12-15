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

// stripe.js - ARCHIVO CORRECTO Y ACTUALIZADO
import { loadStripe } from "@stripe/stripe-js";

// 1. Cargar Stripe con tu clave pública
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// 2. URL base de tu función de Supabase
const SUPABASE_FUNCTION_URL = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1`;

// 3. Función PRINCIPAL que sí usarás en CheckoutForm.jsx
export const createCheckoutSession = async (productId, cantidad, customerData) => {
  try {
    const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-checkout-session`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Si en el futuro activas autenticación en tu función:
        // "Authorization": `Bearer ${tu_token_aqui}`
      },
      body: JSON.stringify({ 
        productId, 
        cantidad, 
        customer: customerData 
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}: No se pudo crear la sesión de pago`);
    }

    return data; // Esto devuelve { success: true, sessionId: "...", url: "..." }
  } catch (error) {
    console.error("Error en createCheckoutSession:", error);
    throw error;
  }
};

// ⚠️ IMPORTANTE: NO exportes ni uses la función "redirectToCheckout".
// Tu CheckoutForm.jsx ahora maneja la redirección directamente con window.location.href
