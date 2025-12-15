import React, { useState } from 'react';
import { X, Shield, CreditCard } from 'lucide-react';
import { stripePromise } from '../lib/stripe';
import { createCheckoutSession } from '../lib/stripe';
import { supabase } from '../lib/supabase';

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
  const [step, setStep] = useState(1); // 1: Info personal, 2: Resumen

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      const session = await createCheckoutSession(
        product.id,
        formData.cantidad,
        formData
      );

      // Redirigir a Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('Error:', error);
      alert(`Error al procesar el pago: ${error.message}`);
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
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className={`p-4 rounded-2xl mb-6 ${getGradientClass(product.platform)} bg-opacity-10`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{product.icon}</span>
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.pieces} piezas</p>
              </div>
            </div>
            <div className="text-sm">
              <p>Precio unitario: <span className="font-bold">${product.price} MXN</span></p>
              <p>Cantidad: <span className="font-bold">{formData.cantidad}</span></p>
              <p>Total: <span className="font-bold">${total} MXN</span></p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="55 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección completa *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Calle, número, colonia"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

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
                      <option key={i + 1} value={i + 1}>
                        {i + 1} caja{(i + 1) > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Máximo 5 unidades por compra
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Producto:</span>
                    <span className="font-bold">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cantidad:</span>
                    <span className="font-bold">{formData.cantidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">${total} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span className="font-bold text-green-600">GRATIS</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-purple-600">${total} MXN</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Pago seguro con Stripe</p>
                      <p className="text-xs text-blue-600">
                        Serás redirigido a Stripe para completar el pago de forma segura.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${getButtonClass(product.platform)} text-white text-lg font-bold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Procesando...
                  </>
                ) : step === 1 ? (
                  'Continuar al Pago'
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pagar con Stripe
                  </>
                )}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full border-2 border-gray-300 text-gray-700 text-lg font-bold py-4 rounded-xl hover:bg-gray-50 transition"
                >
                  ← Volver a editar información
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function getGradientClass(platform) {
  switch (platform) {
    case 'aliexpress': return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    case 'amazon': return 'bg-gradient-to-r from-orange-500 to-yellow-400';
    case 'mercadolibre': return 'bg-gradient-to-r from-green-500 to-teal-400';
    default: return 'bg-gradient-to-r from-gray-500 to-gray-400';
  }
}

function getButtonClass(platform) {
  switch (platform) {
    case 'aliexpress': return 'bg-gradient-to-r from-blue-600 to-cyan-500';
    case 'amazon': return 'bg-gradient-to-r from-orange-600 to-yellow-500';
    case 'mercadolibre': return 'bg-gradient-to-r from-green-600 to-teal-500';
    default: return 'bg-gradient-to-r from-gray-600 to-gray-500';
  }
}