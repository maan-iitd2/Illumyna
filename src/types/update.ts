export interface Update {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  tags: string[];
  difficulty: string;
  estimatedMinutes: number;
  sources: string[];
  resources: {
    papers: string[];
    articles: string[];
    videos: string[];
  };
  addedAt: string;
  status: 'new' | 'dismissed' | 'converted';
  refinedSummary?: string;
  relevanceScore?: number;
  recommendation?: 'high' | 'medium' | 'low';
}
