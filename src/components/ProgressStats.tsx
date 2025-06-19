import React from 'react';
import { TrendingUp, Calendar, Target } from 'lucide-react';

interface ProgressStatsProps {
  completedTasks: number;
  totalTasks: number;
  currentPhase: string;
  estimatedTimeLeft: string;
}

export function ProgressStats({ completedTasks, totalTasks, currentPhase, estimatedTimeLeft }: ProgressStatsProps) {
  const progressPercentage = (completedTasks / totalTasks) * 100;
  
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-gray-900">Progreso</span>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-1">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-sm text-gray-600">
            {completedTasks} de {totalTasks} completadas
          </div>
          <div className="w-full h-2 bg-red-200 rounded-full mt-2">
            <div 
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Fase Actual</span>
          </div>
          <div className="text-lg font-bold text-blue-600 mb-1">
            {currentPhase}
          </div>
          <div className="text-sm text-gray-600">
            Sigue avanzando paso a paso
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Tiempo Estimado</span>
          </div>
          <div className="text-lg font-bold text-green-600 mb-1">
            {estimatedTimeLeft}
          </div>
          <div className="text-sm text-gray-600">
            Para completar todo
          </div>
        </div>
      </div>
    </div>
  );
}