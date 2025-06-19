import React from 'react';
import { Task } from '../../types';

interface TaskCardTipProps {
  task: Task;
  status: string;
  compact: boolean;
}

export function TaskCardTip({ task, status, compact }: TaskCardTipProps) {
  // Tip preview - SOLO mostrar si NO está completada y NO está bloqueada
  if (!task.tip || compact || status !== 'active') {
    return null;
  }

  // Estilo especial para tareas opcionales
  const tipStyles = task.isOptional 
    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-800'
    : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700';

  return (
    <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-lg border ${tipStyles}`}>
      <p className="text-xs font-medium line-clamp-1">
        💡 {task.tip}
      </p>
    </div>
  );
}