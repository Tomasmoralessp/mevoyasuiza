import { Phase, Progress } from '../types';

export function calculatePhaseProgress(phase: Phase, progress: Progress) {
  const completedTasks = phase.tasks.filter(task => 
    progress[task.id]?.status === 'completed'
  ).length;
  const totalTasks = phase.tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;
  const isPhaseCompleted = completedTasks === totalTasks;

  return {
    completedTasks,
    totalTasks,
    progressPercentage,
    isPhaseCompleted
  };
}

export function findActivePhase(phases: Phase[], progress: Progress): number {
  return phases.findIndex(phase => 
    phase.tasks.some(task => {
      const taskProgress = progress[task.id];
      return !taskProgress || taskProgress.status !== 'completed';
    })
  );
}

export function isPhaseUnlocked(phase: Phase, phases: Phase[], progress: Progress): boolean {
  const phaseIndex = phases.findIndex(p => p.id === phase.id);
  if (phaseIndex === 0) return true;
  
  const previousPhase = phases[phaseIndex - 1];
  return previousPhase.tasks.every(task => progress[task.id]?.status === 'completed');
}

export function getPhaseStatusColor(phase: Phase, progress: Progress): string {
  const { isPhaseCompleted } = calculatePhaseProgress(phase, progress);
  return isPhaseCompleted ? 'emerald' : 'blue';
}