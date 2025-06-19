import React, { useState } from 'react';
import { X, User, AlertCircle } from 'lucide-react';
import { GoogleAuthButton } from './GoogleAuthButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSuccess = () => {
    setError(null);
    onClose();
  };

  const handleError = (error: Error) => {
    setError(error.message || 'Error al iniciar sesión');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-indigo-50 to-indigo-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600">
              Guarda tu progreso de forma segura en la nube
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Error de autenticación</h4>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <GoogleAuthButton onSuccess={handleSuccess} onError={handleError} />

          {/* Benefits */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">✨ Beneficios de tener cuenta:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Sincronización automática en todos tus dispositivos</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Backup seguro de tu progreso</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Recordatorios personalizados</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Cronograma adaptado a tu fecha límite</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad.
              Tu progreso se guardará de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}