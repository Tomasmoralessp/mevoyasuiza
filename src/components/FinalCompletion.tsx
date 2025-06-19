import React from 'react';

export function FinalCompletion() {
  return (
    <div className="mt-20 text-center">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 border border-purple-200 rounded-3xl p-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-800 mb-6">
          🎊 ¡Felicidades!
        </h2>
        <p className="text-xl text-purple-700 mb-8">
          Has completado todo el proceso de emigración a Suiza. 
          ¡Bienvenido a tu nueva vida!
        </p>
        <div className="text-purple-600 text-lg">
          <p className="font-medium">Tu aventura suiza acaba de comenzar 🇨🇭</p>
        </div>
      </div>
    </div>
  );
}