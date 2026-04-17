import { create } from 'zustand';
import type { KnowledgeNode, KnowledgeEdge } from '../types';

interface KnowledgeState {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  addNode: (node: KnowledgeNode) => void;
  updateNodeStatus: (id: string, status: KnowledgeNode['status']) => void;
}

const mockNodes: KnowledgeNode[] = [
  { id: '1', label: 'Fundamentals', status: 'learned' },
  { id: '2', label: 'Intermediate Concepts', status: 'learned' },
  { id: '3', label: 'Advanced Application', status: 'in-progress' },
  { id: '4', label: 'Side Topic A', status: 'recommended' },
  { id: '5', label: 'Specialization', status: 'recommended' },
];

const mockEdges: KnowledgeEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
];

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  nodes: mockNodes,
  edges: mockEdges,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNodeStatus: (id, status) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, status } : n)
  })),
}));
