import { useState, useEffect } from 'react';
import { supabase, UserProgress } from '../lib/supabase';
import { Progress } from '../types';
import { useAuthStore } from '../stores/useAuthStore';

export function useUserProgress() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [progress, setProgress] = useState<Progress>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProgress();
    } else {
      const localProgress = localStorage.getItem('mevoyasuiza-progress');
      if (localProgress) {
        setProgress(JSON.parse(localProgress));
      }
    }
  }, [isAuthenticated, user]);

  const loadUserProgress = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('🔄 Cargando progreso del usuario:', user.id);

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap: Progress = {};
      data?.forEach((item: UserProgress) => {
        progressMap[item.task_id] = {
          status: item.status,
          notes: item.notes,
          uploadedFile: item.uploaded_file_name
        };
      });

      console.log('✅ Progreso cargado:', progressMap);
      setProgress(progressMap);
      localStorage.setItem('mevoyasuiza-progress', JSON.stringify(progressMap));
    } catch (error) {
      console.error('❌ Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskProgress = async (taskId: string, updates: Partial<Progress[string]>) => {
    console.log('🔄 Actualizando progreso de tarea:', taskId, updates);

    const newProgress = {
      ...progress,
      [taskId]: {
        ...progress[taskId],
        ...updates
      }
    };

    setProgress(newProgress);
    localStorage.setItem('mevoyasuiza-progress', JSON.stringify(newProgress));

    if (isAuthenticated && user) {
      try {
        const progressData = {
          user_id: user.id,
          task_id: taskId,
          status: updates.status || progress[taskId]?.status || 'active',
          notes: updates.notes,
          uploaded_file_name: updates.uploadedFile,
          completed_at: updates.status === 'completed' ? new Date().toISOString() : null
        };

        console.log('💾 Guardando en base de datos:', progressData);

        const { error } = await supabase
          .from('user_progress')
          .upsert(progressData, { onConflict: 'user_id,task_id' });

        if (error) throw error;

        console.log('✅ Progreso guardado en base de datos');
        await updateCurrentPhase(newProgress);
      } catch (error) {
        console.error('❌ Error saving progress to database:', error);
      }
    }
  };

  const updateCurrentPhase = async (currentProgress: Progress) => {
    if (!user) return;

    try {
      const phases = [
        'antes-de-irte',
        'buscar-alojamiento',
        'llegada-suiza',
        'tramites-esenciales',
        'buscar-trabajo',
        'alojamiento-permanente',
        'adaptacion-cultural'
      ];

      const currentPhase = 'antes-de-irte';
      // TODO: lógica real para determinar la fase actual
      console.log('🔄 Actualizando fase actual a:', currentPhase);

      const { error } = await supabase
        .from('user_profiles')
        .update({ current_phase: currentPhase })
        .eq('id', user.id);

      if (error) throw error;

      console.log('✅ Fase actual actualizada en perfil');
    } catch (error) {
      console.error('❌ Error updating current phase:', error);
    }
  };

  const syncLocalProgressToDatabase = async () => {
    if (!isAuthenticated || !user) return;

    const localProgress = localStorage.getItem('mevoyasuiza-progress');
    if (!localProgress) return;

    try {
      console.log('🔄 Sincronizando progreso local con base de datos...');
      const progressData = JSON.parse(localProgress);

      const progressArray = Object.entries(progressData).map(
        ([taskId, taskProgress]: [string, any]) => ({
          user_id: user.id,
          task_id: taskId,
          status: taskProgress.status,
          notes: taskProgress.notes,
          uploaded_file_name: taskProgress.uploadedFile,
          completed_at: taskProgress.status === 'completed' ? new Date().toISOString() : null
        })
      );

      if (progressArray.length > 0) {
        const { error } = await supabase
          .from('user_progress')
          .upsert(progressArray, { onConflict: 'user_id,task_id' });

        if (error) throw error;

        console.log('✅ Progreso local sincronizado con base de datos');
      }
    } catch (error) {
      console.error('❌ Error syncing local progress to database:', error);
    }
  };

  return {
    progress,
    loading,
    updateTaskProgress,
    syncLocalProgressToDatabase,
    loadUserProgress
  };
}
