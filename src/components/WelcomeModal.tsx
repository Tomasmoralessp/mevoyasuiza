import React from 'react';
import { X, CheckCircle, Clock, Users } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-red-50 to-red-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="text-center">
            <div className="text-6xl mb-4">🇨🇭</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido a tu nueva aventura!
            </h2>
            <p className="text-lg text-gray-700">
              Tu guía completa para emigrar a Suiza paso a paso
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">24 Tareas</h3>
              <p className="text-sm text-gray-600">Organizadas en 6 fases claras</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">3-6 Meses</h3>
              <p className="text-sm text-gray-600">Tiempo estimado del proceso</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">+5,000</h3>
              <p className="text-sm text-gray-600">Españoles ya en Suiza</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-amber-900 mb-2">💡 Cómo funciona</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Las tareas se desbloquean secuencialmente</li>
              <li>• Guarda documentos y notas en cada paso</li>
              <li>• Tu progreso se guarda automáticamente</li>
              <li>• Sigue los consejos de otros emigrantes</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition-colors"
          >
            ¡Empezar mi viaje a Suiza!
          </button>
        </div>
      </div>
    </div>
  );
}