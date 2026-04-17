export interface KnowledgeNode {
  id: string;
  label: string;
  status: 'learned' | 'in-progress' | 'recommended';
  taskId?: string;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
}
