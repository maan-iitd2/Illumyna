export interface Task {
  id: string;
  updateId: string;
  title: string;
  topic: string;
  mediaType: 'pdf' | 'youtube' | 'article';
  mediaUrl: string;
  progressPercent: number;
  notes: string;
  status: 'active' | 'completed' | 'paused';
  timeSpentSeconds: number;
  createdAt: string;
  completedAt?: string;
}
