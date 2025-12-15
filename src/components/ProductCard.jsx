import React from 'react';
import { Package, Truck, AlertTriangle } from 'lucide-react';

export default function ProductCard({ product, onBuy }) {
const getStockPercentage = () => {
  if (!product.initial_stock || product.initial_stock === 0) return 0;
  return Math.round((product.stock / product.initial_stock) * 100);
};

  const getColorClass = () => {
    switch (product.platform) {
      case 'aliexpress': return 'from-blue-500 to-cyan-400';
      case 'amazon': return 'from-orange-500 to-yellow-400';
      case 'mercadolibre': return 'from-green-500 to-teal-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getButtonClass = () => {
    switch (product.platform) {
      case 'aliexpress': return 'bg-gradient-to-r from-blue-600 to-cyan-500';
      case 'amazon': return 'bg-gradient-to-r from-orange-600 to-yellow-500';
      case 'mercadolibre': return 'bg-gradient-to-r from-green-600 to-teal-500';
      default: return 'bg-gradient-to-r from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition duration-300">
      <div className={`h-3 bg-gradient-to-r ${getColorClass()}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{product.icon}</span>
              <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            </div>
            <p className="text-gray-500">{product.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${product.price} MXN</div>
            <div className="text-sm text-gray-500">Incluye {product.pieces} piezas</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold">{product.pieces} productos sorpresa</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <span>Envío: {product.shipping_days} días</span>
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Stock disponible</span>
            <span className="font-bold">{product.stock} / {product.initial_stock}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getColorClass().replace('from-', 'bg-gradient-to-r from-')}`}
              style={{ width: `${getStockPercentage()}%` }}
            ></div>
          </div>
          {product.stock <= 3 && (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
              <AlertTriangle className="w-4 h-4" />
              <span>¡Quedan pocas unidades!</span>
            </div>
          )}
        </div>

        <button
          onClick={onBuy}
          disabled={product.stock === 0}
          className={`w-full ${getButtonClass()} text-white text-lg font-bold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
        >
          {product.stock === 0 ? 'AGOTADO' : '🛒 Comprar Ahora'}
        </button>
      </div>
    </div>
  );
}