import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Phase } from '../types';

interface PhaseHeaderProps {
  phase: Phase;
  completedTasks: number;
  totalTasks: number;
  isCompleted: boolean;
  canProceed: boolean;
  phaseNumber: number;
  totalPhases: number;
  onProceedToNext?: () => void;
}

export function PhaseHeader({ 
  phase, 
  completedTasks, 
  totalTasks, 
  isCompleted,
  phaseNumber,
  totalPhases
}: PhaseHeaderProps) {
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="relative">
          <span className="text-6xl">{phase.icon}</span>
          {isCompleted && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Fase {phaseNumber} de {totalPhases}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {phase.title}
      </h1>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
        {phase.description}
      </p>

      {phase.estimatedDuration && (
        <p className="text-lg text-blue-600 font-medium mb-8">
          ⏱️ Duración estimada: {phase.estimatedDuration}
        </p>
      )}

      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
          <span>Progreso de la fase</span>
          <span>{completedTasks} / {totalTasks}</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full transition-all duration-700 ${
              isCompleted ? 'bg-green-600' : 'bg-red-600'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {Math.round(progressPercentage)}% completado
        </div>
      </div>

      {/* Phase Status */}
      {isCompleted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-green-800 mb-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">¡Fase completada!</span>
          </div>
          <p className="text-green-700">
            Has completado todas las tareas de esta fase. 
          </p>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <div className="text-red-800 font-semibold mb-2">
            Fase en progreso
          </div>
          <p className="text-red-700">
            Completa las tareas activas para avanzar en tu proceso.
          </p>
        </div>
      )}
    </div>
  );
}