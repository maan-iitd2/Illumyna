import { create } from 'zustand';
import type { Update } from '../types';

interface UpdatesState {
  updates: Update[];
  isLoading: boolean;
  lastFetched: string | null;
  fetchError: string | null;
  setUpdates: (updates: Update[], fetchedAt: string) => void;
  dismissUpdate: (id: string) => void;
  convertUpdate: (id: string) => void;
  setLoading: (bool: boolean) => void;
  setFetchError: (message: string | null) => void;
}

const mockUpdates: Update[] = [
  {
    id: 'u1',
    title: 'React 19 Hooks Overview',
    summary: 'A deep dive into the new hooks provided by React 19.',
    whyItMatters: 'Vital for keeping up with modern React development.',
    tags: ['React', 'Frontend'],
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    sources: ['React Blog', 'GitHub'],
    resources: { papers: [], articles: ['https://react.dev/blog/react-19'], videos: [] },
    addedAt: new Date().toISOString(),
    status: 'new'
  },
  {
    id: 'u2',
    title: 'Advanced TypeScript Patterns',
    summary: 'Learn how to leverage conditional types and mapped types in TypeScript.',
    whyItMatters: 'Helps in writing robust and type-safe abstractions.',
    tags: ['TypeScript'],
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    sources: ['TS Docs'],
    resources: { papers: [], articles: [], videos: [] },
    addedAt: new Date().toISOString(),
    status: 'new'
  },
  {
    id: 'u3',
    title: 'FastAPI for Machine Learning',
    summary: 'How to serve an ML model using a robust FastAPI backend.',
    whyItMatters: 'Crucial for ML ops and deployment.',
    tags: ['Python', 'FastAPI', 'ML'],
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    sources: ['FastAPI Docs'],
    resources: { papers: [], articles: [], videos: [] },
    addedAt: new Date().toISOString(),
    status: 'new'
  },
  {
    id: 'u4',
    title: 'Mastering Zustand State',
    summary: 'Everything you need to know to leverage Zustand in React apps.',
    whyItMatters: 'It is the state management library chosen for Illumyna.',
    tags: ['State', 'React'],
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    sources: ['Zustand Docs'],
    resources: { papers: [], articles: [], videos: [] },
    addedAt: new Date().toISOString(),
    status: 'new'
  }
];

export const useUpdatesStore = create<UpdatesState>((set) => ({
  updates: mockUpdates,
  isLoading: false,
  lastFetched: null,
  fetchError: null,
  setUpdates: (updates, fetchedAt) => set({ updates, lastFetched: fetchedAt, fetchError: null }),
  dismissUpdate: (id) => set((state) => ({ 
    updates: state.updates.map(u => u.id === id ? { ...u, status: 'dismissed' as const } : u)
  })),
  convertUpdate: (id) => set((state) => ({
    updates: state.updates.map(u => u.id === id ? { ...u, status: 'converted' as const } : u)
  })),
  setLoading: (bool) => set({ isLoading: bool }),
  setFetchError: (message) => set({ fetchError: message }),
}));
