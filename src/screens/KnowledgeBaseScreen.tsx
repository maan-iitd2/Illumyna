import React, { useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import type { Node as FlowNode, NodeMouseHandler } from '@xyflow/react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ScreenProps } from './HomeScreen';
import { useKnowledgeStore } from '../store/knowledgeStore';
import { useTasksStore } from '../store/tasksStore';
import '@xyflow/react/dist/style.css';
import './KnowledgeBaseScreen.css';

export const KnowledgeBaseScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { nodes: storeNodes, edges: storeEdges } = useKnowledgeStore();
  const { setActiveTask } = useTasksStore();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);

  const initialNodes: FlowNode[] = useMemo(() => {
    return storeNodes.map(node => ({
      id: node.id,
      position: node.position || { x: 0, y: 0 },
      data: { label: node.label, taskId: node.taskId },
      className: `kb-node ${node.status}`,
    }));
  }, [storeNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const edgeColor = isDarkMode ? '#555555' : '#e5e5e5';
  
  const generateEdges = (color: string) => storeEdges.map((edge, index) => ({
    id: `e-${index}-${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color },
    style: { stroke: color, strokeWidth: 2 }
  }));

  const [edges, setEdges, onEdgesChange] = useEdgesState(generateEdges(edgeColor));

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(generateEdges(isDarkMode ? '#555555' : '#e5e5e5'));
  }, [storeEdges, isDarkMode, setEdges]); // eslint-disable-line react-hooks/exhaustive-deps

  const onNodeClick: NodeMouseHandler = (event, node) => {
    if (node.data.taskId) {
      setActiveTask(node.data.taskId as string);
      navigate('/task');
    } else {
      setTooltip({
        x: event.clientX,
        y: event.clientY - 40,
        label: node.data.label as string
      });
      setTimeout(() => setTooltip(null), 2000);
    }
  };

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
      
      <div className="react-flow-container" style={{ position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color={isDarkMode ? '#333' : '#ccc'} gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
        {tooltip && (
          <div className="fade-in" style={{
            position: 'absolute',
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 500,
            pointerEvents: 'none',
            zIndex: 1000,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {tooltip.label} (No linked task)
          </div>
        )}
      </div>
    </div>
  );
};
