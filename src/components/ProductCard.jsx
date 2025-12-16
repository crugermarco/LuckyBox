import React from 'react';
import { Package, Truck, AlertTriangle, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onBuy }) {
  const getStockPercentage = () => {
    if (!product.initial_stock || product.initial_stock === 0) return 0;
    return Math.round((product.stock / product.initial_stock) * 100);
  };

  // 🎨 Franja de color superior
  const getColorClass = () => {
    switch (product.platform) {
      case 'aliexpress': return 'from-blue-500 to-cyan-400';
      case 'amazon': return 'from-orange-500 to-yellow-400';
      case 'mercadolibre': return 'from-green-500 to-teal-400';
      case 'nintendo': return 'from-red-500 via-pink-400 to-purple-400';
      case 'playstation': return 'from-blue-600 via-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  // ✨ Efectos ESPECIALES SIN BLOQUEAR CLICS
  const getSpecialEffects = () => {
    switch (product.platform) {
      case 'nintendo':
        return `
          bg-gradient-to-b from-white via-red-50 to-white
          shadow-2xl shadow-red-200/50
          border-2 border-red-100
          hover:border-red-300
          transition-all duration-300
        `;
      case 'playstation':
        return `
          bg-gradient-to-b from-white via-blue-50/50 to-white
          shadow-2xl shadow-blue-200/50
          border-2 border-blue-100
          hover:border-blue-300
          backdrop-blur-sm
          transition-all duration-300
        `;
      default:
        return 'bg-white border border-gray-200';
    }
  };

  // 🎯 Botones con efectos
  const getButtonClass = () => {
    switch (product.platform) {
      case 'aliexpress': return 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600';
      case 'amazon': return 'bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600';
      case 'mercadolibre': return 'bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600';
      case 'nintendo':
        return `
          bg-gradient-to-r from-red-600 via-pink-500 to-purple-600
          hover:from-red-700 hover:via-pink-600 hover:to-purple-700
          shadow-lg shadow-red-300/50
          hover:shadow-xl hover:shadow-red-400/50
          transform hover:scale-[1.02]
        `;
      case 'playstation':
        return `
          bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600
          hover:from-blue-800 hover:via-indigo-700 hover:to-purple-700
          shadow-lg shadow-blue-300/50
          hover:shadow-xl hover:shadow-blue-400/50
          transform hover:scale-[1.02]
        `;
      default: return 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600';
    }
  };

  // ✨ Icono especial
  const getSpecialIcon = () => {
    switch (product.platform) {
      case 'nintendo':
        return (
          <div className="relative group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🎮</span>
            <div className="absolute -top-2 -right-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        );
      case 'playstation':
        return (
          <div className="relative group">
            <span className="text-3xl group-hover:rotate-12 transition-transform">🎮</span>
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-blue-400 animate-spin" />
          </div>
        );
      default:
        return <span className="text-3xl">{product.icon}</span>;
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden transform hover:-translate-y-3 transition-all duration-300 ${getSpecialEffects()}`}>
      
      {/* 🎨 FRANJA SUPERIOR ANIMADA */}
      <div className={`h-3 bg-gradient-to-r ${getColorClass()} ${(product.platform === 'nintendo' || product.platform === 'playstation') ? 'animate-gradient-x' : ''}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {getSpecialIcon()}
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
                {(product.platform === 'nintendo' || product.platform === 'playstation') && (
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                      {product.platform === 'nintendo' ? 'EDICIÓN ESPECIAL' : 'COLECCIÓN PREMIUM'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600">{product.description}</p>
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

        {/* 📊 Indicador de Stock */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Stock disponible</span>
            <span className="font-bold">{product.stock} / {product.initial_stock}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-700 bg-gradient-to-r ${getColorClass()}`}
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

        {/* 🛒 Botón FUNCIONAL */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Previene que el clic se propague
            onBuy();
          }}
          disabled={product.stock === 0}
          className={`w-full ${getButtonClass()} text-white text-lg font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative z-10`} // ← Añadí z-10
        >
          {product.stock === 0 ? (
            'AGOTADO'
          ) : (
            <>
              <span>🛒</span>
              <span>Comprar Ahora</span>
              {(product.platform === 'nintendo' || product.platform === 'playstation') && (
                <Sparkles className="w-5 h-5" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}