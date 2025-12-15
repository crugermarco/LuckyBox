// /lib/stripe.js - ARCHIVO CORREGIDO
const SUPABASE_FUNCTION_URL = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1`;

export const createCheckoutSession = async (productId, cantidad, customerData) => {
  try {
    const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        cantidad,
        customer: customerData
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    return await res.json(); // Devuelve { sessionId, url }
  } catch (error) {
    console.error("Error en createCheckoutSession:", error);
    throw error;
  }
};

// ⚠️ NO exportes nada más. Elimina 'stripePromise' y 'loadStripe'.
