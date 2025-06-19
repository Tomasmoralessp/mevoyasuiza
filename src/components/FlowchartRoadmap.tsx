import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Share2, FileText, Trophy } from 'lucide-react';
import { Phase, Task, Progress } from '../types';
import { FlowchartPhase } from './FlowchartPhase';
import { DocumentManager } from './DocumentManager';
import { ExportProgress } from './ExportProgress';
import { AuthModal } from './AuthModal';
import { DeadlineTracker } from './DeadlineTracker';

interface FlowchartRoadmapProps {
  phases: Phase[];
  progress: Progress;
  onTaskClick: (task: Task) => void;
}

export function FlowchartRoadmap({ phases, progress, onTaskClick }: FlowchartRoadmapProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Find current active phase
  const activePhaseIndex = phases.findIndex(phase => 
    phase.tasks.some(task => {
      const taskProgress = progress[task.id];
      return !taskProgress || taskProgress.status !== 'completed';
    })
  );

  useEffect(() => {
    if (activePhaseIndex !== -1) {
      setCurrentPhaseIndex(activePhaseIndex);
    }
  }, [activePhaseIndex]);

  const handleLogin = (email: string) => {
    setShowAuth(false);
  };

  return (
    <div className="relative h-full">
      {/* Compact Top Action Bar */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-2">
          <div className="flex items-center space-x-2">
            {/* Deadline Tracker */}
            <DeadlineTracker />

            {/* Action Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowDocuments(!showDocuments)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 group relative"
                title="Gestor de Documentos"
              >
                <FileText className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Documentos
                </span>
              </button>

              <button
                onClick={() => setShowExport(!showExport)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110 group relative"
                title="Exportar Progreso"
              >
                <Download className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Exportar
                </span>
              </button>

              <button
                onClick={() => {/* Share functionality */}}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 hover:scale-110 group relative"
                title="Compartir Progreso"
              >
                <Share2 className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Compartir
                </span>
              </button>

              <button
                onClick={() => {/* Achievements functionality */}}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 hover:scale-110 group relative"
                title="Logros y Gamificación"
              >
                <Trophy className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Logros
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1))}
              disabled={currentPhaseIndex === 0}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {phases[currentPhaseIndex]?.title}
              </div>
              <div className="text-xs text-gray-500">
                Fase {currentPhaseIndex + 1} de {phases.length}
              </div>
            </div>
            
            <button
              onClick={() => setCurrentPhaseIndex(Math.min(phases.length - 1, currentPhaseIndex + 1))}
              disabled={currentPhaseIndex === phases.length - 1}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full overflow-hidden">
        <div className="h-full w-full max-w-7xl mx-auto px-8 pt-24 pb-8">
          <FlowchartPhase
            phase={phases[currentPhaseIndex]}
            progress={progress}
            onTaskClick={onTaskClick}
            isActive={currentPhaseIndex === activePhaseIndex}
            showAllPhases={false}
            isLastPhase={currentPhaseIndex === phases.length - 1}
            nextPhase={currentPhaseIndex < phases.length - 1 ? phases[currentPhaseIndex + 1] : undefined}
          />
        </div>
      </div>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}

      {showDocuments && (
        <DocumentManager
          progress={progress}
          phases={phases}
          onClose={() => setShowDocuments(false)}
        />
      )}

      {showExport && (
        <ExportProgress
          phases={phases}
          progress={progress}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}