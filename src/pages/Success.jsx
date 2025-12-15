import React, { useEffect, useState } from 'react';
import { Check, Truck, Package, Gift, Home } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrder } from '../lib/supabase.js';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      fetchOrder(sessionId);
    }
  }, [searchParams]);

  const fetchOrder = async (sessionId) => {
    try {
      // En producción, aquí obtendrías la orden desde tu backend
      // Por ahora simularemos una orden exitosa
      setTimeout(() => {
        setOrder({
          id: sessionId,
          product: {
            name: 'Caja Sorpresa Amazon',
            pieces: 20,
            price: 350
          },
          quantity: 1,
          total: 350,
          customer_name: 'Cliente Demo',
          shipping_address: 'Dirección de ejemplo',
          created_at: new Date().toISOString()
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando tu pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Pago Exitoso! 🎉</h1>
          <p className="text-gray-600">Tu caja sorpresa está en camino</p>
        </div>

        {order && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gift className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Detalles de tu orden</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Orden ID:</span> {order.id.slice(0, 8)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Producto:</span> {order.product.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total:</span> ${order.total} MXN
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <Package className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-bold text-gray-800">Preparando tu sorpresa</h3>
              <p className="text-sm text-gray-600">Estamos seleccionando los mejores productos para ti</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <Truck className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-gray-800">Envío en 10 días hábiles</h3>
              <p className="text-sm text-gray-600">Recibirás un correo con el número de rastreo</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-lg font-semibold"
          >
            <Home className="w-5 h-5" />
            Volver a la tienda
          </Link>
          
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition font-semibold"
          >
            📄 Imprimir comprobante
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            ¿Tienes preguntas? Contáctanos: soporte@sorpresabox.com
          </p>
        </div>
      </div>
    </div>
  );
}