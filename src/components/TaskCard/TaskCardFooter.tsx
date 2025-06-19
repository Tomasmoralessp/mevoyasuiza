import React from 'react';
import { FileText, ExternalLink, Edit3, Check } from 'lucide-react';
import { Task, Progress } from '../../types';

interface TaskCardFooterProps {
  task: Task;
  progress?: Progress[string];
  status: string;
}

export function TaskCardFooter({ task, progress, status }: TaskCardFooterProps) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-3">
        {task.fileRequired && (
          <div className={`flex items-center space-x-1 ${
            progress?.uploadedFile ? 'text-emerald-600' : 
            status === 'blocked' ? 'text-gray-400' : 
            status === 'completed' ? 'text-emerald-600' : 'text-gray-500'
          }`}>
            <FileText className="w-3.5 h-3.5" />
            {progress?.uploadedFile && <Check className="w-2.5 h-2.5" />}
          </div>
        )}
        
        {task.links && task.links.length > 0 && (
          <div className={`flex items-center space-x-1 ${
            status === 'blocked' ? 'text-gray-400' : 
            status === 'completed' ? 'text-emerald-600' : 'text-blue-600'
          }`}>
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{task.links.length}</span>
          </div>
        )}
        
        {(task.notes || progress?.notes) && (
          <div className={`${
            status === 'blocked' ? 'text-gray-400' : 
            status === 'completed' ? 'text-emerald-600' : 'text-purple-600'
          }`}>
            <Edit3 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Status indicator - Solo punto de color */}
      <div className="flex items-center">
        {status === 'completed' && (
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        )}
        {status === 'active' && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )}
        {status === 'blocked' && (
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        )}
      </div>
    </div>
  );
}