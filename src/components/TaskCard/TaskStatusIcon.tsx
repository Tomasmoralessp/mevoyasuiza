import React from 'react';
import { Check, Lock, Sparkles, AlertTriangle, Star } from 'lucide-react';

interface TaskStatusIconProps {
  status: string;
  compact: boolean;
  task: any; // Recibimos toda la tarea para acceder a priority e isOptional
}

export function TaskStatusIcon({ status, compact, task }: TaskStatusIconProps) {
  const iconSize = compact ? 'w-6 h-6' : 'w-8 h-8';
  const innerSize = compact ? 'w-3 h-3' : 'w-4 h-4';
  
  // Si está completada, SIEMPRE mostrar check verde sin importar el tipo
  if (status === 'completed') {
    return (
      <div className={`${iconSize} bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-300`}>
        <Check className={`${innerSize} text-white stroke-[2.5]`} />
      </div>
    );
  }
  
  // Si está bloqueada, SIEMPRE mostrar lock gris
  if (status === 'blocked') {
    return (
      <div className={`${iconSize} bg-gray-400 rounded-full flex items-center justify-center shadow-sm border-2 border-gray-300`}>
        <Lock className={`${innerSize} text-white stroke-[2]`} />
      </div>
    );
  }
  
  // Solo para tareas ACTIVAS, mostrar el tipo específico
  const getTaskTypeIcon = () => {
    if (task.isOptional) {
      return {
        icon: Sparkles,
        bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
        borderColor: 'border-amber-300',
        animation: 'animate-pulse'
      };
    }
    
    if (task.priority === 'critical') {
      return {
        icon: AlertTriangle,
        bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
        borderColor: 'border-red-300',
        animation: ''
      };
    }
    
    if (task.priority === 'high') {
      return {
        icon: Star,
        bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
        borderColor: 'border-orange-300',
        animation: ''
      };
    }
    
    // Tarea normal
    return {
      icon: null,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      borderColor: 'border-blue-300',
      animation: ''
    };
  };

  const taskType = getTaskTypeIcon();
  
  return (
    <div className={`${iconSize} ${taskType.bgColor} rounded-full flex items-center justify-center shadow-lg border-2 ${taskType.borderColor} ${taskType.animation}`}>
      {taskType.icon ? (
        <taskType.icon className={`${innerSize} text-white stroke-[2]`} />
      ) : (
        <div className={`${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'} bg-white rounded-full`} />
      )}
    </div>
  );
}