import React from 'react';
import { Check, Lock, Clock, AlertTriangle, ArrowDown, FileText, ExternalLink, Edit3 } from 'lucide-react';
import { Task } from '../types';

interface RoadmapStepProps {
  task: Task;
  isLast: boolean;
  onClick: () => void;
  index: number;
}

export function RoadmapStep({ task, isLast, onClick, index }: RoadmapStepProps) {
  const isEven = index % 2 === 0;
  
  const getStatusStyles = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-green-100';
      case 'active':
        return 'bg-gradient-to-br from-white to-red-50 border-red-300 shadow-red-100 shadow-xl ring-2 ring-red-100';
      case 'blocked':
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return (
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-6 h-6 text-white" />
          </div>
        );
      case 'active':
        return (
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
        );
      case 'blocked':
        return (
          <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = () => {
    if (task.priority === 'critical') {
      return (
        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Crítico</span>
        </div>
      );
    }
    if (task.priority === 'high') {
      return (
        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Importante
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      {/* Curved Path Background */}
      <div className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} mb-8`}>
        <div className={`w-full max-w-lg ${isEven ? 'mr-8' : 'ml-8'}`}>
          {/* Task Card */}
          <div
            onClick={onClick}
            className={`
              relative p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer
              ${getStatusStyles()}
              ${task.status === 'blocked' ? 'opacity-80' : 'hover:shadow-2xl hover:scale-[1.02]'}
            `}
          >
            {/* Priority Badge */}
            {getPriorityBadge() && (
              <div className="absolute top-4 right-4">
                {getPriorityBadge()}
              </div>
            )}

            {/* Content */}
            <div className="flex items-start space-x-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon()}
              </div>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-bold mb-2 leading-tight ${
                  task.status === 'blocked' ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                <p className={`text-sm mb-3 line-clamp-3 leading-relaxed ${
                  task.status === 'blocked' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>

                {/* Time estimate */}
                {task.estimatedTime && (
                  <div className={`flex items-center space-x-1 mb-3 ${
                    task.status === 'blocked' ? 'text-gray-400' : 'text-blue-600'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{task.estimatedTime}</span>
                  </div>
                )}

                {/* Bottom indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {task.fileRequired && (
                      <div className={`flex items-center space-x-1 ${
                        task.uploadedFile ? 'text-green-600' : task.status === 'blocked' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <FileText className="w-4 h-4" />
                        {task.uploadedFile && <Check className="w-3 h-3" />}
                      </div>
                    )}
                    
                    {task.links && task.links.length > 0 && (
                      <div className={`flex items-center space-x-1 ${
                        task.status === 'blocked' ? 'text-gray-400' : 'text-blue-600'
                      }`}>
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs font-medium">{task.links.length}</span>
                      </div>
                    )}
                    
                    {task.notes && (
                      <div className={`flex items-center space-x-1 ${
                        task.status === 'blocked' ? 'text-gray-400' : 'text-purple-600'
                      }`}>
                        <Edit3 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Status indicator */}
                  {task.status === 'completed' && (
                    <div className="text-xs text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                      ✓ Completada
                    </div>
                  )}
                  {task.status === 'blocked' && (
                    <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                      🔒 Bloqueada
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tip preview */}
            {task.tip && (
              <div className={`mt-4 p-3 rounded-xl border ${
                task.status === 'blocked' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
              }`}>
                <p className={`text-xs font-medium line-clamp-2 ${
                  task.status === 'blocked' ? 'text-gray-500' : 'text-amber-800'
                }`}>
                  💡 {task.tip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection Path */}
      {!isLast && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 z-10">
          <div className="flex flex-col items-center">
            <div className={`w-1 h-8 ${
              task.status === 'completed' ? 'bg-green-400' : 'bg-gray-300'
            } transition-colors duration-300`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              task.status === 'completed' ? 'bg-green-400' : 'bg-gray-300'
            } transition-colors duration-300 shadow-lg`}>
              <ArrowDown className={`w-4 h-4 ${
                task.status === 'completed' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
          </div>
        </div>
      )}

      {/* Curved connector line */}
      {!isLast && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
          <svg width="100" height="60" className="overflow-visible">
            <path
              d={`M 50 0 Q ${isEven ? '25' : '75'} 30 50 60`}
              stroke={task.status === 'completed' ? '#4ade80' : '#d1d5db'}
              strokeWidth="2"
              fill="none"
              className="transition-colors duration-300"
            />
          </svg>
        </div>
      )}
    </div>
  );
}