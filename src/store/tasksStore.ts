import { create } from 'zustand';
import type { Task } from '../types';

interface TasksState {
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (task: Task) => void;
  setActiveTask: (id: string | null) => void;
  updateProgress: (id: string, percent: number) => void;
  addTimeSpent: (id: string, seconds: number) => void;
  completeTask: (id: string) => void;
}

const mockTasks: Task[] = [
  {
    id: 't1',
    updateId: 'u0',
    title: 'Introduction to Local LLMs',
    topic: 'AI',
    mediaType: 'article',
    mediaUrl: 'https://example.com/llms',
    progressPercent: 60,
    notes: 'Really interesting concept.',
    status: 'active',
    timeSpentSeconds: 1200,
    createdAt: new Date().toISOString()
  },
  {
    id: 't2',
    updateId: 'u00',
    title: 'Building Responsive UIs',
    topic: 'CSS',
    mediaType: 'youtube',
    mediaUrl: 'https://youtube.com/watch?v=12345',
    progressPercent: 85,
    notes: '',
    status: 'paused',
    timeSpentSeconds: 3000,
    createdAt: new Date().toISOString()
  }
];

export const useTasksStore = create<TasksState>((set) => ({
  tasks: mockTasks,
  activeTaskId: 't1',
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setActiveTask: (id) => set({ activeTaskId: id }),
  updateProgress: (id, percent) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, progressPercent: Math.min(100, Math.max(0, percent)) } : t)
  })),
  addTimeSpent: (id, seconds) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, timeSpentSeconds: t.timeSpentSeconds + seconds } : t)
  })),
  completeTask: (id) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'completed' as const, progressPercent: 100, completedAt: new Date().toISOString() } : t)
  })),
}));
