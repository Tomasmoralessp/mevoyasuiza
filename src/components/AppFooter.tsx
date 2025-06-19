import React from 'react';
import { Heart } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-2 text-lg">
            <span>Hecho con</span>
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <span>para la comunidad española en Suiza</span>
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Tu progreso se guarda automáticamente • Más de 5,000 españoles ya viven en Suiza
          </p>
        </div>
      </div>
    </footer>
  );
}