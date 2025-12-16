import React, { useState } from 'react';
import { X, Shield, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SUPABASE_FUNCTION_URL = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1`;

export default function CheckoutForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    cantidad: 1
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      // Verificar stock
      const { data: currentStock } = await supabase
        .from('products')
        .select('stock')
        .eq('id', product.id)
        .single();

      if (currentStock.stock < formData.cantidad) {
        alert(`¡Solo quedan ${currentStock.stock} unidades disponibles!`);
        setLoading(false);
        return;
      }

      // Crear sesión de checkout
      const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
        productId: product.id,
        cantidad: formData.cantidad,
        customerData: formData // ✅ AHORA
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      // 🛠️ CAMBIO CLAVE AQUÍ: Extraer la 'url' y redirigir directamente
      const { url, sessionId } = await res.json();

      // Método 1: Redirigir directamente a la URL de Stripe (RECOMENDADO)
      if (url) {
        window.location.href = url;
        return; // Importante: detener la ejecución aquí
      }
      
      // Método 2: Backup usando sessionId (por si acaso 'url' no viene)
      if (sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
        return;
      }
      
      // Si no hay ni url ni sessionId, lanzar error
      throw new Error('No se recibió URL de pago válida');

    } catch (err) {
      console.error('Error:', err);
      alert(`Error al procesar el pago: ${err.message}`);
      setLoading(false);
    }
  };

  const total = product.price * formData.cantidad;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 ? 'Información de Envío' : 'Resumen de Compra'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" disabled={loading}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                {/* Campos de información del cliente */}
                {['nombre','telefono','email','direccion','ciudad','codigoPostal'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field === 'nombre' ? 'Nombre completo *' : field.charAt(0).toUpperCase() + field.slice(1) + ' *'}
                    </label>
                    <input
                      type={field==='email'?'email':field==='telefono'?'tel':'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder={field==='nombre'?'Juan Pérez':field==='telefono'?'55 1234 5678':field==='email'?'correo@ejemplo.com':'Ingrese su '+field}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <select
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    {[...Array(Math.min(5, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between"><span>Producto:</span><span className="font-bold">{product.name}</span></div>
                  <div className="flex justify-between"><span>Cantidad:</span><span className="font-bold">{formData.cantidad}</span></div>
                  <div className="flex justify-between"><span>Total:</span><span className="font-bold">${total} MXN</span></div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? 'Procesando...' : step === 1 ? 'Continuar al Pago' : 'Pagar con Stripe'}
              </button>
              {step===2 && <button type="button" onClick={()=>setStep(1)} className="w-full border-2 border-gray-300 text-gray-700 text-lg font-bold py-4 rounded-xl">← Volver a editar información</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}