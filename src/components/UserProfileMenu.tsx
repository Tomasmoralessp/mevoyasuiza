import React, { useState } from 'react';
import { LogOut, Settings, User, Calendar, MapPin, Edit3 } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { SWISS_CANTONS } from '../lib/supabase';

export function UserProfileMenu() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const profile = useUserProfileStore((state) => state.profile);

  const [showMenu, setShowMenu] = useState(false);

  if (!user || !profile) return null;

  const targetCanton = SWISS_CANTONS.find(c => c.code === profile.target_canton);
  const targetDate = profile.target_move_date ? new Date(profile.target_move_date).toLocaleDateString('es-ES') : null;

  const handleLogout = async () => {
    try {
      await signOut();
      setShowMenu(false);
      window.location.reload(); // vuelve a la pantalla principal
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = () => {
    // Implementar funcionalidad en el futuro
    console.log('🔧 Editar perfil - por implementar');
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200"
      >
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name || 'Usuario'}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {(profile.full_name || profile.email).charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="text-left hidden sm:block">
          <div className="text-xs text-gray-700 font-medium truncate max-w-20">
            {profile.full_name?.split(' ')[0] || profile.email.split('@')[0]}
          </div>
        </div>
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || 'Usuario'}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {profile.full_name || 'Usuario'}
                </div>
                <div className="text-xs text-gray-500 truncate">{profile.email}</div>
              </div>
            </div>
          </div>

          {/* User Goals */}
          {(targetDate || targetCanton) && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-700 mb-2">Tu objetivo:</div>
              {targetDate && (
                <div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>Mudanza: {targetDate}</span>
                </div>
              )}
              {targetCanton && (
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>Destino: {targetCanton.name_es}</span>
                </div>
              )}
            </div>
          )}

          {/* Menu Items */}
          <button
            onClick={() => {/* abrir modal futura configuración */}}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>

          <button
            onClick={handleEditProfile}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar perfil</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
