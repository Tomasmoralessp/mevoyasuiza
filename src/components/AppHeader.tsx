import React from 'react';
import { User, LogOut, Home } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { UserProfileMenu } from './UserProfileMenu';

interface AppHeaderProps {
  overallProgress: number;
  completedTasks: number;
  totalTasks: number;
  currentPhase?: {
    title: string;
    icon: string;
    progress: number;
    completedTasks: number;
    totalTasks: number;
  };
  isGuest: boolean;
}

export function AppHeader({ 
  overallProgress, 
  completedTasks, 
  totalTasks,
  currentPhase,
  isGuest
}: AppHeaderProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const signOut = useAuthStore((state) => state.signOut);

  const handleBackToRegistration = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🇨🇭</span>
              <h1 className="text-xl font-semibold text-gray-900">
                MeVoyA<span className="text-blue-600">Suiza</span>.app
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {currentPhase && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{currentPhase.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-blue-900 mb-1">
                      Sección Actual
                    </div>
                    <div className="text-xs text-blue-700 font-medium">
                      {currentPhase.title}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-right mb-1">
                      <span className="text-xs font-semibold text-blue-800">
                        {Math.round(currentPhase.progress)}%
                      </span>
                    </div>
                    <div className="w-16 h-1.5 bg-blue-200 rounded-full">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${currentPhase.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {currentPhase.completedTasks}/{currentPhase.totalTasks}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && (
              <>
                {isGuest ? (
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-amber-600" />
                        <span className="text-xs text-amber-700 font-medium">Modo Invitado</span>
                      </div>
                    </div>
                    <button
                      onClick={handleBackToRegistration}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
                    >
                      <User className="w-4 h-4" />
                      <span>Crear Cuenta</span>
                    </button>
                  </div>
                ) : isAuthenticated ? (
                  <UserProfileMenu />
                ) : null}
                
                <button
                  onClick={handleBackToRegistration}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  title={isAuthenticated ? "Cerrar sesión" : "Volver al registro"}
                >
                  {isAuthenticated ? (
                    <LogOut className="w-4 h-4" />
                  ) : (
                    <Home className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {isAuthenticated ? 'Salir' : 'Inicio'}
                  </span>
                </button>
              </>
            )}

            <div className="text-right">
              <div className="text-sm font-semibold text-gray-700">
                {Math.round(overallProgress)}% completado
              </div>
              <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {completedTasks} / {totalTasks} obligatorias
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
