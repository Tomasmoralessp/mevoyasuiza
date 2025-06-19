import React, { useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { FlowchartRoadmap } from './components/FlowchartRoadmap';
import { TaskModal } from './components/TaskModal';
import { RegistrationPage } from './components/RegistrationPage';
import { OnboardingModal } from './components/OnboardingModal';
import { phases } from './data/phases';
import { useUserProgress } from './hooks/useUserProgress';
import { useTaskProgress } from './hooks/useTaskProgress';
import { calculateOverallProgress, findCurrentPhase, calculatePhaseProgress } from './utils/progressCalculations';
import { Task } from './types';
import { useAuthStore } from './stores/useAuthStore';
import { useUserProfileStore } from './stores/useUserProfileStore';
import { useAuthSessionEffect } from './hooks/useAuthSessionEffect';
import { useUserProfileEffect } from './hooks/useUserProfileEffect';

function App() {
  useAuthSessionEffect();
  useUserProfileEffect();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authLoading = useAuthStore((state) => state.loading);

  const needsOnboarding = useUserProfileStore((state) => state.needsOnboarding);
  const loadingProfile = useUserProfileStore((state) => state.loadingProfile);

  const { progress, updateTaskProgress, syncLocalProgressToDatabase } = useUserProgress();
  const { handleUpdateTask } = useTaskProgress(progress, updateTaskProgress);

  const { totalTasks, completedTasks, overallProgress } = calculateOverallProgress(progress);
  const currentPhaseIndex = findCurrentPhase(progress);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      syncLocalProgressToDatabase();
    }
  }, [isAuthenticated, authLoading]);

  const getCurrentPhaseInfo = () => {
    if (currentPhaseIndex === -1) return null;

    const currentPhase = phases[currentPhaseIndex];
    const {
      totalTasks: phaseTotalTasks,
      completedTasks: phaseCompletedTasks,
      progressPercentage: phaseProgress
    } = calculatePhaseProgress(currentPhase, progress);

    return {
      title: currentPhase.title,
      icon: currentPhase.icon,
      progress: phaseProgress,
      completedTasks: phaseCompletedTasks,
      totalTasks: phaseTotalTasks
    };
  };

  const currentPhaseInfo = getCurrentPhaseInfo();

  const handleContinueAsGuest = () => {
    console.log('👤 Continuando como invitado');
    setIsGuest(true);
  };

  console.log('🔍 App state:', {
    isAuthenticated,
    needsOnboarding,
    authLoading,
    loadingProfile,
    isGuest
  });

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated && !isGuest) {
    return <RegistrationPage onContinueAsGuest={handleContinueAsGuest} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {needsOnboarding && (
        <OnboardingModal
          isOpen={true}
          onClose={() => {
            console.log('⚠️ Onboarding modal cerrado (no debería pasar)');
          }}
        />
      )}

      <AppHeader
        overallProgress={overallProgress}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        currentPhase={currentPhaseInfo}
        isGuest={isGuest}
      />

      <main className="pb-8">
        <FlowchartRoadmap
          phases={phases}
          progress={progress}
          onTaskClick={setSelectedTask}
        />
      </main>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}

      <AppFooter />
    </div>
  );
}

export default App;
