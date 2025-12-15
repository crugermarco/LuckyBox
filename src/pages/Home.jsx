import React, { useState, useEffect } from 'react';
import { Shield, Truck, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { supabase } from '../lib/supabase.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos desde Supabase
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price');
      
    if (!error) {
      setProducts(data);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-9 h-9 text-purple-600" />
            <div>
              <span className="text-2xl font-bold text-gray-800">SorpresaBox</span>
              <p className="text-sm text-gray-500">Cajas misteriosas con productos increíbles</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm">Envío 10 días</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Pago seguro</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-4 right-4 bg-yellow-300 text-purple-800 px-6 py-2 rounded-full font-bold text-xl transform rotate-12 animate-pulse">
            ¡STOCK LIMITADO!
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">🎁 ¡Descubre lo Inesperado!</h1>
          <p className="text-xl mb-6 opacity-90">Cajas sorpresa llenas de productos de tus tiendas favoritas</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">🔥 Oferta Especial</div>
              <p className="text-sm">Precios increíbles por tiempo limitado</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">🚚 Envío Rápido</div>
              <p className="text-sm">10 días hábiles a todo México</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">⭐ Satisfacción Garantizada</div>
              <p className="text-sm">Miles de clientes felices</p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">✨ Nuestras Cajas Sorpresa</h2>
          <p className="text-gray-600 text-center mb-8">Elige tu caja misteriosa y descubre productos increíbles</p>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={() => openModal(product)}
              />
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-10 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">🎯 ¿Por qué elegir nuestras cajas sorpresa?</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Sorpresa Garantizada</h3>
              <p className="text-sm opacity-90">Nunca sabrás qué recibirás hasta abrirla</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Calidad Premium</h3>
              <p className="text-sm opacity-90">Productos de marcas reconocidas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Valor Increíble</h3>
              <p className="text-sm opacity-90">Hasta 3x el valor de tu compra</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Envío Rápido</h3>
              <p className="text-sm opacity-90">10 días hábiles a todo México</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-2">SorpresaBox 🎁</p>
          <p className="text-gray-400">Descubre lo inesperado en cada caja</p>
          <p className="text-gray-400 text-sm mt-4">© 2024 SorpresaBox. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Checkout */}
      {showModal && selectedProduct && (
        <CheckoutForm
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
