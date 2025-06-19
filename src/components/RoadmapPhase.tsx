import React from 'react';
import { Phase, Task, Progress } from '../types';
import { PhaseHeader } from './PhaseHeader';
import { RoadmapStep } from './RoadmapStep';
import { PhaseCompletion } from './PhaseCompletion';

interface RoadmapPhaseProps {
  phase: Phase;
  phaseIndex: number;
  totalPhases: number;
  progress: Progress;
  showAllPhases: boolean;
  onTaskClick: (task: Task) => void;
  onContinueToNext: () => void;
  nextPhaseTitle?: string;
}

export function RoadmapPhase({
  phase,
  phaseIndex,
  totalPhases,
  showAllPhases,
  onTaskClick,
  onContinueToNext,
  nextPhaseTitle
}: RoadmapPhaseProps) {
  const completedTasks = phase.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = phase.tasks.length;
  const isPhaseCompleted = completedTasks === totalTasks;

  return (
    <div className={`${phaseIndex > 0 ? 'mt-20' : ''}`}>
      {/* Phase Header */}
      <PhaseHeader
        phase={phase}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        isCompleted={isPhaseCompleted}
        canProceed={false}
        phaseNumber={phaseIndex + 1}
        totalPhases={totalPhases}
      />

      {/* Roadmap Steps */}
      <div className="relative">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200" />
        
        {phase.tasks.map((task, index) => (
          <RoadmapStep
            key={task.id}
            task={task}
            isLast={index === phase.tasks.length - 1}
            onClick={() => onTaskClick(task)}
            index={index}
          />
        ))}
      </div>

      {/* Phase Completion */}
      {isPhaseCompleted && phaseIndex < totalPhases - 1 && (
        <PhaseCompletion
          phase={phase}
          phaseIndex={phaseIndex}
          totalPhases={totalPhases}
          showAllPhases={showAllPhases}
          onContinue={onContinueToNext}
        />
      )}
    </div>
  );
}