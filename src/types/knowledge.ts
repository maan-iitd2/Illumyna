export interface KnowledgeNode {
  id: string;
  label: string;
  status: 'learned' | 'in-progress' | 'recommended';
  taskId?: string;
  position?: { x: number; y: number };
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
}
