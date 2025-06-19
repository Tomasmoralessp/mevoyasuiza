import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Phase, Task, Progress } from '../types';
import { FlowchartTaskCard } from './FlowchartTaskCard';
import { calculatePhaseProgress } from '../utils/progressCalculations';

interface FlowchartPhaseProps {
  phase: Phase;
  progress: Progress;
  onTaskClick: (task: Task) => void;
  isActive: boolean;
  showAllPhases: boolean;
  isLastPhase: boolean;
  nextPhase?: Phase;
}

export function FlowchartPhase({ 
  phase, 
  progress, 
  onTaskClick, 
  isActive, 
  showAllPhases,
  isLastPhase,
  nextPhase
}: FlowchartPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<Array<{
    x: number, 
    y: number, 
    id: string, 
    sequence: number,
    isOptional: boolean,
    status: string
  }>>([]);
  
  // Usar la nueva función que solo cuenta tareas obligatorias
  const { totalTasks, completedTasks, progressPercentage, isPhaseCompleted } = calculatePhaseProgress(phase, progress);

  const cardsPerRow = 3;

  // Calculate card positions after rendering
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      
      const cardElements = containerRef.current.querySelectorAll('[data-card-id]');
      
      const positions: Array<{
        x: number, 
        y: number, 
        id: string, 
        sequence: number,
        isOptional: boolean,
        status: string
      }> = [];
      
      cardElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        const taskId = element.getAttribute('data-card-id') || '';
        const task = phase.tasks.find(t => t.id === taskId);
        const taskStatus = progress[taskId]?.status || task?.status || 'blocked';
        
        positions.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          id: taskId,
          sequence: parseInt(element.getAttribute('data-card-sequence') || '0'),
          isOptional: task?.isOptional || false,
          status: taskStatus
        });
      });
      
      // Sort by sequence
      positions.sort((a, b) => a.sequence - b.sequence);
      setCardPositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [phase.tasks, progress]);

  // Generate main flow path with dynamic opacity
  const generateMainPath = () => {
    if (cardPositions.length < 2) return [];
    
    let pathSegments: Array<{
      path: string;
      opacity: number;
      strokeColor: string;
    }> = [];
    
    for (let i = 1; i < cardPositions.length; i++) {
      const currentPos = cardPositions[i];
      const prevPos = cardPositions[i - 1];
      
      // Calcular opacidad basada en el estado de las tareas
      let opacity = 1;
      let strokeColor = '#3b82f6'; // azul por defecto
      
      // Si alguna de las dos tareas está bloqueada o es opcional inactiva, reducir opacidad
      if (prevPos.status === 'blocked' || currentPos.status === 'blocked') {
        opacity = 0.2;
        strokeColor = '#9ca3af'; // gris
      } else if (prevPos.isOptional || currentPos.isOptional) {
        // Para tareas opcionales, usar color ámbar y opacidad reducida si no están en hover
        opacity = 0.4;
        strokeColor = '#f59e0b'; // ámbar
      } else if (prevPos.status === 'completed' && currentPos.status === 'completed') {
        strokeColor = '#10b981'; // verde para completadas
      }
      
      // Determinar si es cambio de fila
      const prevSequence = prevPos.sequence - 1;
      const currentSequence = currentPos.sequence - 1;
      const prevRow = Math.floor(prevSequence / cardsPerRow);
      const currentRow = Math.floor(currentSequence / cardsPerRow);
      
      const deltaX = currentPos.x - prevPos.x;
      const deltaY = currentPos.y - prevPos.y;
      
      let segmentPath = `M ${prevPos.x} ${prevPos.y}`;
      
      if (currentRow > prevRow) {
        // Cambio de fila - conectar por el exterior
        const isEvenRow = prevRow % 2 === 0;
        const margin = 80;
        
        if (isEvenRow) {
          // Fila par terminando, ir por la derecha
          const controlX1 = prevPos.x + margin;
          const controlY1 = prevPos.y;
          const controlX2 = prevPos.x + margin;
          const controlY2 = prevPos.y + deltaY * 0.5;
          const controlX3 = currentPos.x + margin;
          const controlY3 = prevPos.y + deltaY * 0.5;
          const controlX4 = currentPos.x + margin;
          const controlY4 = currentPos.y;
          
          segmentPath += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${prevPos.x + margin} ${prevPos.y + deltaY * 0.5}`;
          segmentPath += ` C ${controlX3} ${controlY3}, ${controlX4} ${controlY4}, ${currentPos.x} ${currentPos.y}`;
        } else {
          // Fila impar terminando, ir por la izquierda
          const controlX1 = prevPos.x - margin;
          const controlY1 = prevPos.y;
          const controlX2 = prevPos.x - margin;
          const controlY2 = prevPos.y + deltaY * 0.5;
          const controlX3 = currentPos.x - margin;
          const controlY3 = prevPos.y + deltaY * 0.5;
          const controlX4 = currentPos.x - margin;
          const controlY4 = currentPos.y;
          
          segmentPath += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${prevPos.x - margin} ${prevPos.y + deltaY * 0.5}`;
          segmentPath += ` C ${controlX3} ${controlY3}, ${controlX4} ${controlY4}, ${currentPos.x} ${currentPos.y}`;
        }
      } else {
        // Movimiento dentro de la misma fila
        const controlX1 = prevPos.x + deltaX * 0.5;
        const controlY1 = prevPos.y;
        const controlX2 = prevPos.x + deltaX * 0.5;
        const controlY2 = currentPos.y;
        
        segmentPath += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${currentPos.x} ${currentPos.y}`;
      }
      
      pathSegments.push({
        path: segmentPath,
        opacity,
        strokeColor
      });
    }
    
    return pathSegments;
  };

  const renderCards = () => {
    let sequence = 0;
    const totalRows = Math.ceil(phase.tasks.length / cardsPerRow);
    
    return Array.from({ length: totalRows }, (_, rowIndex) => {
      const startIndex = rowIndex * cardsPerRow;
      const rowCards = phase.tasks.slice(startIndex, startIndex + cardsPerRow);
      const isEvenRow = rowIndex % 2 === 0;
      
      const displayCards = isEvenRow ? rowCards : [...rowCards].reverse();
      
      return (
        <div key={rowIndex} className="flex justify-center items-center mb-16 gap-8 relative">
          {displayCards.map((task, cardIndex) => {
            const sequentialIndex = startIndex + (isEvenRow ? cardIndex : (rowCards.length - 1 - cardIndex));
            sequence++;
            
            return (
              <div 
                key={task.id}
                data-card-id={task.id}
                data-card-sequence={sequentialIndex + 1}
                className="relative z-10"
              >
                <FlowchartTaskCard
                  task={task}
                  progress={progress[task.id]}
                  onClick={() => onTaskClick(task)}
                  compact={false}
                />
                
                {/* Task number indicator - Solo para tareas obligatorias */}
                {!task.isOptional && (
                  <div className={`absolute -top-2 -left-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold shadow-sm z-20 border-2 border-white transition-all duration-500 ${
                    progress[task.id]?.status === 'completed' 
                      ? 'bg-emerald-500 text-white' 
                      : progress[task.id]?.status === 'active'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-400 text-white opacity-40'
                  }`}>
                    {/* Calcular número solo entre tareas obligatorias */}
                    {phase.tasks.filter((t, idx) => idx <= sequentialIndex && !t.isOptional).length}
                  </div>
                )}
                
                {/* Badge especial para tareas opcionales */}
                {task.isOptional && (
                  <div className={`absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg z-20 border-2 border-white transition-all duration-500 ${
                    progress[task.id]?.status === 'completed'
                      ? 'animate-none'
                      : progress[task.id]?.status === 'active'
                      ? 'animate-pulse'
                      : 'opacity-40'
                  }`}>
                    ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Calcular estadísticas de tareas opcionales para mostrar por separado
  const optionalTasks = phase.tasks.filter(task => task.isOptional);
  const completedOptionalTasks = optionalTasks.filter(task => progress[task.id]?.status === 'completed').length;

  const pathSegments = generateMainPath();

  return (
    <div className="w-full">
      {/* Phase Header */}
      <div className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <span className="text-4xl">{phase.icon}</span>
          {isPhaseCompleted && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {phase.title}
        </h2>
        
        <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
          {phase.description}
        </p>

        {phase.estimatedDuration && (
          <p className="text-base text-blue-600 font-medium mb-8">
            ⏱️ {phase.estimatedDuration}
          </p>
        )}

        {/* Progress Bar - Solo tareas obligatorias */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Progreso (tareas obligatorias)</span>
            <span>{completedTasks} / {totalTasks}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                isPhaseCompleted ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round(progressPercentage)}% completado
          </div>
        </div>

        {/* Optional Tasks Progress - Si hay tareas opcionales */}
        {optionalTasks.length > 0 && (
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm font-medium text-amber-700 mb-2">
              <span>Extras opcionales ✨</span>
              <span>{completedOptionalTasks} / {optionalTasks.length}</span>
            </div>
            <div className="w-full h-1.5 bg-amber-100 rounded-full">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${optionalTasks.length > 0 ? (completedOptionalTasks / optionalTasks.length) * 100 : 0}%` }}
              />
            </div>
            <div className="text-xs text-amber-600 mt-1">
              Tareas extra completadas
            </div>
          </div>
        )}

        {/* Status Badge */}
        {isPhaseCompleted ? (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-medium inline-block">
            ✓ Fase completada
          </div>
        ) : isActive ? (
          <div className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium inline-block">
            📍 Fase actual
          </div>
        ) : (
          <div className="bg-gray-50 text-gray-600 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium inline-block">
            🔒 Próximamente
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto">
        {/* SVG for connection lines with dynamic opacity */}
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Arrow markers for different states */}
            <marker
              id="arrowhead-main"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              fill="#3b82f6"
            >
              <polygon points="0 0, 8 3, 0 6" />
            </marker>
            
            <marker
              id="arrowhead-completed"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              fill="#10b981"
            >
              <polygon points="0 0, 8 3, 0 6" />
            </marker>
            
            <marker
              id="arrowhead-optional"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              fill="#f59e0b"
            >
              <polygon points="0 0, 8 3, 0 6" />
            </marker>
            
            <marker
              id="arrowhead-blocked"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              fill="#9ca3af"
            >
              <polygon points="0 0, 8 3, 0 6" />
            </marker>
          </defs>
          
          {/* Render path segments with individual opacity */}
          {pathSegments.map((segment, index) => {
            const getMarkerEnd = () => {
              if (segment.strokeColor === '#10b981') return 'url(#arrowhead-completed)';
              if (segment.strokeColor === '#f59e0b') return 'url(#arrowhead-optional)';
              if (segment.strokeColor === '#9ca3af') return 'url(#arrowhead-blocked)';
              return 'url(#arrowhead-main)';
            };
            
            return (
              <path
                key={index}
                d={segment.path}
                stroke={segment.strokeColor}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6,3"
                markerEnd={getMarkerEnd()}
                opacity={segment.opacity}
                className="drop-shadow-sm transition-all duration-500"
              />
            );
          })}
        </svg>
        
        {/* Task Cards */}
        <div className="relative z-10 pb-8">
          {renderCards()}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">📋 Leyenda del flujo:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-1 bg-blue-500 rounded"></div>
              <span className="text-gray-700">Flujo principal (obligatorio)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-1 bg-amber-500 rounded opacity-60"></div>
              <span className="text-gray-700">Conexión opcional (transparente)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-1 bg-emerald-500 rounded"></div>
              <span className="text-gray-700">Flujo completado</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-1 bg-gray-400 rounded opacity-30"></div>
              <span className="text-gray-700">Flujo bloqueado (muy transparente)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">✨</span>
              </div>
              <span className="text-gray-700">Tarea opcional (extra, no cuenta para progreso)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚠️</span>
              </div>
              <span className="text-gray-700">Tarea crítica</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Completion Message */}
      {isPhaseCompleted && (
        <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <div className="text-emerald-800 font-semibold text-lg mb-2">
            🎉 ¡Fase completada!
          </div>
          <p className="text-emerald-700 text-sm">
            Todas las tareas obligatorias están terminadas. 
            {!isLastPhase && " ¡Puedes continuar con la siguiente fase!"}
            {optionalTasks.length > 0 && completedOptionalTasks < optionalTasks.length && (
              <span className="block mt-2 text-amber-700">
                ✨ Aún tienes {optionalTasks.length - completedOptionalTasks} tareas opcionales disponibles.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}