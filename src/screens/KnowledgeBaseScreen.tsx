import React, { useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import { Menu, Moon, Sun } from 'lucide-react';
import type { ScreenProps } from './HomeScreen';
import '@xyflow/react/dist/style.css';
import './KnowledgeBaseScreen.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Fundamentals' },
    className: 'kb-node learned',
  },
  {
    id: '2',
    position: { x: 50, y: 150 },
    data: { label: 'Intermediate Concepts' },
    className: 'kb-node learned',
  },
  {
    id: '3',
    position: { x: 50, y: 250 },
    data: { label: 'Advanced Application' },
    className: 'kb-node in-progress',
  },
  {
    id: '4',
    position: { x: 250, y: 150 },
    data: { label: 'Side Topic A' },
    className: 'kb-node recommended',
  },
  {
    id: '5',
    position: { x: 250, y: 350 },
    data: { label: 'Specialization' },
    className: 'kb-node recommended',
  },
];

const makeEdges = (edgeColor: string) => [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }, style: { stroke: edgeColor, strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }, style: { stroke: edgeColor, strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }, style: { stroke: edgeColor, strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }, style: { stroke: edgeColor, strokeWidth: 2 } },
];

export const KnowledgeBaseScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const edgeColor = isDarkMode ? '#555555' : '#e5e5e5';
  const [edges, setEdges, onEdgesChange] = useEdgesState(() => makeEdges(edgeColor));

  useEffect(() => {
    setEdges(makeEdges(isDarkMode ? '#555555' : '#e5e5e5'));
  }, [isDarkMode, setEdges]);

  return (
    <div className="kb-screen fade-in">
      <div className="screen-header" style={{ marginBottom: '16px' }}>
        <div className="header-left">
          <button className="icon-button" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <h2 className="kb-title" style={{ margin: 0 }}>Knowledge Base</h2>
        </div>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>
      <div className="kb-legend">
        <div className="legend-item"><span className="dot learned"></span> Learned</div>
        <div className="legend-item"><span className="dot in-progress"></span> In Progress</div>
        <div className="legend-item"><span className="dot recommended"></span> Recommended</div>
      </div>
      
      <div className="react-flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color={isDarkMode ? '#333' : '#ccc'} gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
};
