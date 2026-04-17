import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../types';

interface ProfileState {
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  targetRole: 'Software Engineer',
  currentLevel: 'Intermediate',
  interests: ['React', 'TypeScript', 'Machine Learning', 'UX Design'],
  weeklyCommitmentHours: 10,
  description: 'Looking to bridge the gap between frontend web development and emerging AI tools.'
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (partial) => set((state) => ({ 
        profile: { ...state.profile, ...partial } 
      })),
    }),
    {
      name: 'illumyna-profile-storage',
    }
  )
);
