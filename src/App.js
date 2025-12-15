import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Pago Cancelado</h1>
                <p className="text-gray-600 mb-6">
                  El proceso de pago fue cancelado. No se realizó ningún cargo a tu cuenta.
                </p>
                <div className="space-y-4">
                  <a
                    href="/"
                    className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-lg font-semibold"
                  >
                    Volver a la tienda
                  </a>
                  <p className="text-sm text-gray-500">
                    ¿Problemas con el pago? Contáctanos: soporte@sorpresabox.com
                  </p>
                </div>
              </div>
            </div>
          } />
          <Route path="*" element={
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página no encontrada</h1>
                <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
                <a
                  href="/"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-lg font-semibold"
                >
                  Ir a la tienda
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;