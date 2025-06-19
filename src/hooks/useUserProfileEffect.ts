// src/hooks/useUserProfileEffect.ts
import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';

export function useUserProfileEffect() {
  const user = useAuthStore((state) => state.user);
  const fetchUserProfile = useUserProfileStore((state) => state.fetchUserProfile);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);
}
