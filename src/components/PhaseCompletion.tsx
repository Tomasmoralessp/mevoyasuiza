import React from 'react';
import { Phase } from '../types';

interface PhaseCompletionProps {
  phase: Phase;
  phaseIndex: number;
  totalPhases: number;
  showAllPhases: boolean;
  onContinue: () => void;
}

export function PhaseCompletion({ 
  phase, 
  phaseIndex, 
  totalPhases, 
  showAllPhases, 
  onContinue 
}: PhaseCompletionProps) {
  return (
    <div className="mt-12 text-center">
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-3xl p-8 max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          🎉 ¡Fase completada!
        </h3>
        <p className="text-green-700 mb-6">
          Has completado "{phase.title}". 
          {!showAllPhases && "Puedes continuar con la siguiente fase."}
        </p>
        {!showAllPhases && phaseIndex < totalPhases - 1 && (
          <button
            onClick={onContinue}
            className="bg-green-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-green-700 transition-colors"
          >
            Continuar: {/* Next phase title would be passed as prop */}
          </button>
        )}
      </div>
    </div>
  );
}