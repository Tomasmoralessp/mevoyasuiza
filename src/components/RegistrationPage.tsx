import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Users, Shield, Zap, Globe, Star, Heart, MapPin } from 'lucide-react';
import { GoogleAuthButton } from './GoogleAuthButton';

interface RegistrationPageProps {
  onContinueAsGuest: () => void;
}

export function RegistrationPage({ onContinueAsGuest }: RegistrationPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = () => {
    setIsLoading(true);
    // El flujo continúa automáticamente con el onboarding
  };

  const handleAuthError = (error: Error) => {
    console.error('Error en autenticación:', error);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* Logo y título principal */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-7xl animate-bounce">🇨🇭</div>
                <div className="text-left">
                  <h1 className="text-5xl font-bold text-gray-900">
                    MeVoyA<span className="text-blue-600">Suiza</span>
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Tu guía completa para emigrar a Suiza
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Bienvenido a tu nueva aventura! 🚀
                </h2>
                <p className="text-lg text-gray-700">
                  Más de <strong className="text-emerald-600">5,000 españoles</strong> ya viven en Suiza. 
                  Únete a ellos con nuestra guía paso a paso.
                </p>
              </div>
            </div>

            {/* Estadísticas impactantes */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Tareas Organizadas</div>
                <div className="text-xs text-gray-600">En 6 fases claras</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-emerald-600 mb-2">3-6</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Meses de proceso</div>
                <div className="text-xs text-gray-600">Tiempo estimado real</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Gratis y completo</div>
                <div className="text-xs text-gray-600">Sin costes ocultos</div>
              </div>
            </div>

            {/* Opciones de registro */}
            <div className="max-w-md mx-auto space-y-6">
              {/* Opción principal: Crear cuenta */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200">
                <div className="mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Crea tu cuenta gratuita
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Guarda tu progreso de forma segura y accede desde cualquier dispositivo
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-gray-600">Configurando tu cuenta...</span>
                  </div>
                ) : (
                  <GoogleAuthButton 
                    onSuccess={handleAuthSuccess}
                    onError={handleAuthError}
                  />
                )}
                
                {/* Beneficios de crear cuenta */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-blue-600" />
                    <span>Sincronización automática</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3 h-3 text-emerald-600" />
                    <span>Acceso multiplataforma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-purple-600" />
                    <span>Progreso seguro</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-amber-600" />
                    <span>Recordatorios personalizados</span>
                  </div>
                </div>
              </div>

              {/* Opción secundaria: Continuar como invitado */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">
                  ¿Prefieres explorar primero?
                </p>
                <button
                  onClick={onContinueAsGuest}
                  disabled={isLoading}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
                >
                  <span>Continuar como invitado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Tu progreso se guardará solo en este dispositivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de proceso */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              El proceso paso a paso que te llevará a Suiza
            </h3>
            <p className="text-gray-600">
              6 fases organizadas cronológicamente para que no te pierdas nada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: '📋', 
                title: 'Antes de irte de España', 
                desc: 'Certificados, apostillas y documentación necesaria',
                tasks: '9 tareas'
              },
              { 
                icon: '🏠', 
                title: 'Buscar alojamiento temporal', 
                desc: 'Reservar donde quedarte las primeras semanas',
                tasks: '3 tareas'
              },
              { 
                icon: '🇨🇭', 
                title: 'Llegada a Suiza', 
                desc: 'Registro en comuna y permisos obligatorios',
                tasks: '4 tareas'
              },
              { 
                icon: '📄', 
                title: 'Trámites esenciales', 
                desc: 'Banco, seguro de salud y línea móvil',
                tasks: '4 tareas'
              },
              { 
                icon: '💼', 
                title: 'Buscar trabajo', 
                desc: 'Estrategias y herramientas de búsqueda',
                tasks: '4 tareas'
              },
              { 
                icon: '🤝', 
                title: 'Adaptación cultural', 
                desc: 'Integración en la sociedad suiza',
                tasks: '8 tareas'
              }
            ].map((phase, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{phase.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{phase.desc}</p>
                <div className="text-xs text-blue-600 font-medium">{phase.tasks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>para la comunidad española en Suiza</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Información actualizada • Proceso verificado • Completamente gratuito
          </p>
        </div>
      </div>
    </div>
  );
}