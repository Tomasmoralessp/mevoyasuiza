import { phases } from '../data/phases';
import { Progress } from '../types';

export function calculateOverallProgress(progress: Progress) {
  // Solo contar tareas OBLIGATORIAS para el progreso principal
  const obligatoryTasks = phases.reduce((acc, phase) => 
    acc + phase.tasks.filter(task => !task.isOptional).length, 0
  );
  
  const completedObligatoryTasks = Object.entries(progress)
    .filter(([taskId, taskProgress]) => {
      // Buscar la tarea en todas las fases
      for (const phase of phases) {
        const task = phase.tasks.find(t => t.id === taskId);
        if (task && !task.isOptional && taskProgress.status === 'completed') {
          return true;
        }
      }
      return false;
    }).length;
  
  const overallProgress = obligatoryTasks > 0 ? (completedObligatoryTasks / obligatoryTasks) * 100 : 0;

  return {
    totalTasks: obligatoryTasks,
    completedTasks: completedObligatoryTasks,
    overallProgress,
    // Estadísticas adicionales para mostrar las opcionales por separado
    totalOptionalTasks: phases.reduce((acc, phase) => 
      acc + phase.tasks.filter(task => task.isOptional).length, 0
    ),
    completedOptionalTasks: Object.entries(progress)
      .filter(([taskId, taskProgress]) => {
        for (const phase of phases) {
          const task = phase.tasks.find(t => t.id === taskId);
          if (task && task.isOptional && taskProgress.status === 'completed') {
            return true;
          }
        }
        return false;
      }).length
  };
}

export function findCurrentPhase(progress: Progress) {
  return phases.findIndex(phase => 
    phase.tasks.some(task => {
      // Solo considerar tareas OBLIGATORIAS para determinar la fase actual
      if (task.isOptional) return false;
      
      const taskProgress = progress[task.id];
      return !taskProgress || taskProgress.status !== 'completed';
    })
  );
}

export function isAllPhasesCompleted(progress: Progress) {
  return phases.every(phase => 
    phase.tasks
      .filter(task => !task.isOptional) // Solo tareas obligatorias
      .every(task => progress[task.id]?.status === 'completed')
  );
}

// Nueva función para calcular progreso de fase (solo obligatorias)
export function calculatePhaseProgress(phase: any, progress: Progress) {
  const obligatoryTasks = phase.tasks.filter((task: any) => !task.isOptional);
  const completedObligatoryTasks = obligatoryTasks.filter((task: any) => 
    progress[task.id]?.status === 'completed'
  ).length;
  
  return {
    totalTasks: obligatoryTasks.length,
    completedTasks: completedObligatoryTasks,
    progressPercentage: obligatoryTasks.length > 0 ? (completedObligatoryTasks / obligatoryTasks.length) * 100 : 0,
    isPhaseCompleted: completedObligatoryTasks === obligatoryTasks.length
  };
}