import React from 'react';
import { TaskCardProps } from '../../types';
import { TaskCardHeader } from './TaskCardHeader';
import { TaskCardContent } from './TaskCardContent';
import { TaskCardFooter } from './TaskCardFooter';
import { TaskCardTip } from './TaskCardTip';

export function TaskCard({ task, progress, onClick, compact = false }: TaskCardProps) {
  const status = progress?.status || task.status;
  
  const getStatusStyles = () => {
    // Estilos especiales para tareas opcionales
    if (task.isOptional) {
      switch (status) {
        case 'completed':
          return 'bg-white border-emerald-200 shadow-sm hover:shadow-md ring-1 ring-emerald-100';
        case 'active':
          return 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-md hover:shadow-xl ring-2 ring-amber-200 hover:ring-amber-300 hover:from-amber-100 hover:to-orange-100 hover:border-amber-400 opacity-60 hover:opacity-100';
        case 'blocked':
          return 'bg-gradient-to-br from-amber-25 to-yellow-25 border-amber-200 shadow-sm opacity-30 hover:opacity-70';
        default:
          return 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-sm hover:shadow-md opacity-60 hover:opacity-100';
      }
    }
    
    // Estilos para tareas obligatorias (normales)
    switch (status) {
      case 'completed':
        return 'bg-white border-emerald-200 shadow-sm hover:shadow-md ring-1 ring-emerald-100';
      case 'active':
        return 'bg-white border-blue-200 shadow-md hover:shadow-lg ring-1 ring-blue-100';
      case 'blocked':
        return 'bg-gray-50 border-gray-200 shadow-sm opacity-40';
      default:
        return 'bg-white border-gray-200 shadow-sm';
    }
  };

  const cardWidth = compact ? 'w-72' : 'w-80';
  const cardHeight = 'h-64'; // Altura fija para todas las cards

  return (
    <div
      onClick={status !== 'blocked' ? onClick : undefined}
      className={`
        ${cardWidth} ${cardHeight} relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer
        ${getStatusStyles()}
        ${status !== 'blocked' ? 'hover:-translate-y-1 active:translate-y-0' : 'cursor-not-allowed'}
        flex flex-col justify-between group overflow-hidden
        ${task.isOptional && status === 'active' ? 'hover:scale-105 transform-gpu' : ''}
      `}
    >
      {/* Efecto de brillo sutil para tareas opcionales activas */}
      {task.isOptional && status === 'active' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-orange-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Efecto de partículas doradas para tareas opcionales en hover */}
      {task.isOptional && status === 'active' && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
          <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
          <div className="absolute bottom-6 left-4 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-700" />
        </>
      )}
      
      <TaskCardHeader task={task} status={status} compact={compact} />
      <TaskCardContent task={task} status={status} compact={compact} />
      <TaskCardFooter task={task} progress={progress} status={status} />
      <TaskCardTip task={task} status={status} compact={compact} />
    </div>
  );
}