import React, { useState } from 'react';
import { Calendar, MapPin, Target, ArrowRight, Check } from 'lucide-react';
import { SWISS_CANTONS } from '../lib/supabase';
import { useUserProfileStore } from '../stores/useUserProfileStore';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const {
    onboardingStep: step,
    setOnboardingStep: setStep,
    formData,
    updateFormData,
    completeOnboarding,
    loading,
    error,
    canProceed
  } = useUserProfileStore();

  if (!isOpen) return null;

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getRecommendedDate = () => {
    const today = new Date();
    const recommended = new Date(today.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
    return recommended.toISOString().split('T')[0];
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative p-8 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-center">
            <div className="text-6xl mb-4">🇨🇭</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido a tu aventura suiza!
            </h2>
            <p className="text-lg text-gray-700">
              Vamos a personalizar tu experiencia
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    stepNumber <= step ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¿Cuándo planeas mudarte?
                </h3>
                <p className="text-gray-600">
                  Esto nos ayudará a personalizar tu cronograma y recordatorios
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha objetivo de mudanza
                </label>
                <input
                  type="date"
                  value={formData.targetMoveDate}
                  onChange={(e) => updateFormData({ targetMoveDate: e.target.value })}
                  min={getMinDate()}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h4 className="font-semibold text-amber-900 mb-2">💡 Recomendación</h4>
                  <p className="text-sm text-amber-800 mb-2">
                    El proceso completo suele tomar entre 3-6 meses. Te recomendamos una fecha realista.
                  </p>
                  <button
                    onClick={() => updateFormData({ targetMoveDate: getRecommendedDate() })}
                    className="text-sm text-amber-700 hover:text-amber-900 font-medium underline"
                  >
                    Usar fecha recomendada (6 meses)
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¿A qué cantón te quieres mudar?
                </h3>
                <p className="text-gray-600">
                  Cada cantón tiene sus propias particularidades y requisitos
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantón de destino
                </label>
                <select
                  value={formData.targetCanton}
                  onChange={(e) => updateFormData({ targetCanton: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Selecciona un cantón</option>
                  {SWISS_CANTONS.map((canton) => (
                    <option key={canton.code} value={canton.code}>
                      {canton.name_es} ({canton.name})
                    </option>
                  ))}
                </select>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">ℹ️ ¿No estás seguro?</h4>
                  <p className="text-sm text-blue-800">
                    No te preocupes, puedes cambiar esto más tarde. Los cantones más populares para españoles son:
                    <strong> Zúrich, Ginebra, Berna y Basilea</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¿Qué te motiva a mudarte a Suiza?
                </h3>
                <p className="text-gray-600">
                  Opcional: Esto nos ayuda a personalizar consejos y contenido
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <textarea
                  value={formData.motivation}
                  onChange={(e) => updateFormData({ motivation: e.target.value })}
                  placeholder="Ej: Mejores oportunidades laborales, calidad de vida, aventura..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 ¡Casi listo!</h4>
                  <p className="text-sm text-green-800">
                    Ya tienes todo configurado. Vamos a empezar tu viaje hacia Suiza paso a paso.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <div className="text-sm text-gray-500">
              Paso {step} de 3
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : step === 3 ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{loading ? 'Guardando...' : step === 3 ? 'Completar' : 'Siguiente'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
