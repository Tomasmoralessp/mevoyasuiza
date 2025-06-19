import { useEffect } from 'react';
import { phases } from '../data/phases';
import { Progress } from '../types';

export function useTaskProgress(
  progress: Progress,
  updateTaskProgress: (taskId: string, updates: Partial<Progress[string]>) => Promise<void>
) {
  // Initialize progress and update task statuses
  useEffect(() => {
    const updatedPhases = phases.map(phase => {
      const updatedTasks = phase.tasks.map((task, index) => {
        const savedProgress = progress[task.id];
        
        if (savedProgress) {
          return {
            ...task,
            status: savedProgress.status,
            notes: savedProgress.notes,
            uploadedFile: savedProgress.uploadedFile
          };
        }
        
        // Nueva lógica de desbloqueo:
        // 1. Primera tarea siempre activa
        // 2. Tareas opcionales siempre activas (no bloquean)
        // 3. Tareas obligatorias se desbloquean cuando la anterior obligatoria está completada
        
        if (index === 0) {
          return { ...task, status: 'active' as const };
        }
        
        // Si es opcional, siempre está activa
        if (task.isOptional) {
          return { ...task, status: 'active' as const };
        }
        
        // Para tareas obligatorias, buscar la anterior tarea obligatoria
        let previousObligatoryTask = null;
        for (let i = index - 1; i >= 0; i--) {
          if (!phase.tasks[i].isOptional) {
            previousObligatoryTask = phase.tasks[i];
            break;
          }
        }
        
        if (!previousObligatoryTask) {
          // No hay tarea obligatoria anterior, esta debe estar activa
          return { ...task, status: 'active' as const };
        }
        
        const previousTaskProgress = progress[previousObligatoryTask.id];
        const isUnlocked = previousTaskProgress?.status === 'completed';
        
        return {
          ...task,
          status: isUnlocked ? ('active' as const) : ('blocked' as const)
        };
      });
      
      return { ...phase, tasks: updatedTasks };
    });

    // Update phases data with current progress
    phases.forEach((phase, phaseIndex) => {
      phase.tasks = updatedPhases[phaseIndex].tasks;
    });
  }, [progress]);

  const handleUpdateTask = async (taskId: string, updates: Partial<any>) => {
    console.log('🎯 Actualizando tarea:', taskId, updates);
    
    // Actualizar el progreso
    await updateTaskProgress(taskId, {
      status: updates.status || progress[taskId]?.status || 'active',
      notes: updates.notes !== undefined ? updates.notes : progress[taskId]?.notes,
      uploadedFile: updates.uploadedFile !== undefined ? updates.uploadedFile : progress[taskId]?.uploadedFile
    });

    // Si una tarea obligatoria se completa, desbloquear la siguiente tarea obligatoria
    if (updates.status === 'completed') {
      for (const phase of phases) {
        const taskIndex = phase.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          const currentTask = phase.tasks[taskIndex];
          
          // Solo si es una tarea obligatoria, buscar la siguiente obligatoria
          if (!currentTask.isOptional) {
            // Buscar la siguiente tarea obligatoria
            for (let i = taskIndex + 1; i < phase.tasks.length; i++) {
              const nextTask = phase.tasks[i];
              if (!nextTask.isOptional) {
                console.log('🔓 Desbloqueando siguiente tarea obligatoria:', nextTask.id);
                await updateTaskProgress(nextTask.id, { status: 'active' });
                break;
              }
            }
          }
          break;
        }
      }
    }
  };

  return { handleUpdateTask };
}