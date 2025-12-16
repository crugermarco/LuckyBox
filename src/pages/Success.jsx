import React, { useEffect, useState } from 'react';
import { Check, Truck, Package, Home } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const id = searchParams.get('session_id') || '';
    setSessionId(id);
    
    // Guardar para referencia
    if (id) {
      localStorage.setItem('last_payment_id', id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Pago Completado! ✅</h1>
          <p className="text-gray-600">Tu pedido ha sido procesado</p>
        </div>

        {/* Detalles de la orden - SIMPLE */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h2 className="font-bold text-gray-800 mb-3">Detalles de tu orden</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Orden ID:</p>
                <p className="font-mono font-bold">{sessionId.slice(0, 12).toUpperCase()}...</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Producto:</p>
                <p className="font-bold">Caja Sorpresa Premium</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Piezas incluidas:</p>
                <p className="text-gray-700">Las piezas son variadas y pueden tener valor más alto que el precio de la caja</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Estado:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">✅ Pagado</span>
              </div>
            </div>
          </div>

          {/* Referencia completa (oculta por defecto) */}
          <details className="bg-purple-50 p-3 rounded-lg">
            <summary className="font-semibold text-purple-700 cursor-pointer text-sm">
              🔐 Ver referencia completa
            </summary>
            <div className="mt-2">
              <p className="text-xs text-gray-600 mb-1">ID de transacción:</p>
              <code className="text-xs bg-gray-800 text-gray-100 p-2 rounded block overflow-x-auto">
                {sessionId}
              </code>
              <p className="text-xs text-gray-500 mt-1">Guarda este código para cualquier consulta</p>
            </div>
          </details>
        </div>

        {/* Proceso de envío */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">Preparando tu sorpresa</h3>
              <p className="text-sm text-gray-600">Estamos seleccionando los mejores productos para ti</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">Envío en 10 días hábiles</h3>
              <p className="text-sm text-gray-600">Te notificaremos cuando sea enviado</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-purple-600 text-white text-center font-semibold py-3 rounded-xl hover:bg-purple-700 transition"
          >
            <Home className="inline w-5 h-5 mr-2" />
            Volver a la tienda
          </Link>
          
          <p className="text-sm text-gray-500 text-center">
            ¿Preguntas? Envía tu ID de orden a: soporte@sorpresabox.com
          </p>
        </div>
      </div>
    </div>
  );
}