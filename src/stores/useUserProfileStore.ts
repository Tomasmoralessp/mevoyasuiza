// src/stores/useUserProfileStore.ts
import { create } from 'zustand';
import { supabase, UserProfile } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';

interface FormData {
  targetMoveDate: string;
  targetCanton: string;
  motivation: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  loadingProfile: boolean;
  needsOnboarding: boolean;
  fetchUserProfile: () => Promise<void>;
  createProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;

  // Onboarding flow
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  completeOnboarding: () => Promise<void>;
  loading: boolean;
  error: string | null;
  canProceed: () => boolean;
}

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  loadingProfile: true,
  needsOnboarding: true,
  onboardingStep: 1,
  loading: false,
  error: null,
  formData: {
    targetMoveDate: '',
    targetCanton: '',
    motivation: ''
  },

  fetchUserProfile: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loadingProfile: true });

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('⚠️ Perfil no encontrado o error al cargar:', error.message);
      set({ profile: null, needsOnboarding: true });
    } else {
      set({ profile: data, needsOnboarding: false });
    }

    set({ loadingProfile: false });
  },

  createProfile: async (data: Partial<UserProfile>) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('No user logged in');

    const { error, data: inserted } = await supabase
      .from('user_profiles')
      .insert([{ ...data, id: user.id, email: user.email }])
      .select()
      .single();

    if (error) throw error;

    set({ profile: inserted, needsOnboarding: false });
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;

    set({ profile: data });
  },

  setOnboardingStep: (step) => set({ onboardingStep: step }),

  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  completeOnboarding: async () => {
    const { formData } = get();
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });

    try {
      const newProfile: Partial<UserProfile> = {
        onboarding_completed: true,
        target_move_date: formData.targetMoveDate || null,
        target_canton: formData.targetCanton || null,
        motivation: formData.motivation || null
      };

      const { error, data } = await supabase
        .from('user_profiles')
        .insert([{ ...newProfile, id: user.id, email: user.email }])
        .select()
        .single();

      if (error) throw error;

      set({ profile: data, needsOnboarding: false });
    } catch (error: any) {
      console.error('❌ Error en onboarding:', error.message);
      set({ error: error.message || 'Error desconocido' });
    } finally {
      set({ loading: false });
    }
  },

  canProceed: () => {
    const { onboardingStep, formData } = get();
    switch (onboardingStep) {
      case 1:
        return formData.targetMoveDate !== '';
      case 2:
        return formData.targetCanton !== '';
      case 3:
        return true;
      default:
        return false;
    }
  }
}));
