import React from 'react';
import { Clock } from 'lucide-react';
import { Task } from '../../types';
import { TaskStatusIcon } from './TaskStatusIcon';

interface TaskCardContentProps {
  task: Task;
  status: string;
  compact: boolean;
}

export function TaskCardContent({ task, status, compact }: TaskCardContentProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-start space-x-4 mb-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-1">
          <TaskStatusIcon status={status} compact={compact} task={task} />
        </div>

        {/* Task Info */}
        <div className="flex-1 min-w-0 flex flex-col h-full">
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold mb-2 leading-tight ${
            status === 'blocked' ? 'text-gray-400' : 
            status === 'completed' ? 'text-gray-900' : 
            task.isOptional ? 'text-amber-900' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          {/* Descripción con altura fija y overflow */}
          <div className="flex-1 mb-3">
            <p className={`text-xs leading-relaxed line-clamp-3 ${
              status === 'blocked' ? 'text-gray-400' : 
              status === 'completed' ? 'text-gray-600' : 
              task.isOptional ? 'text-amber-700' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          </div>

          {/* Time estimate */}
          {task.estimatedTime && (
            <div className={`flex items-center space-x-1 mt-auto ${
              status === 'blocked' ? 'text-gray-400' : 
              status === 'completed' ? 'text-emerald-600' : 
              task.isOptional ? 'text-amber-600' : 'text-blue-600'
            }`}>
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">{task.estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}