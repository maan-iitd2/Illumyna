import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import type { Update } from '../types';
import './UpdateCard.css';

interface UpdateCardProps {
  update: Update;
  onDismiss: (id: string) => void;
  onAddToTasks: (update: Update) => void;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ update, onDismiss, onAddToTasks }) => {
  return (
    <div className="update-card fade-in">
      <div className="update-header">
        <h3 className="update-title">{update.title}</h3>
        <div className="difficulty-badge">
          {update.difficulty}
        </div>
      </div>
      
      <p className="update-summary">{update.summary}</p>
      
      <p className="update-why">
        <i>Why it matters:</i> {update.whyItMatters}
      </p>

      <div className="update-meta">
        <div className="meta-item">
          <Clock size={14} />
          <span>{update.estimatedMinutes} min</span>
        </div>
        <div className="meta-item">
          <BookOpen size={14} />
          <span>{update.sources.length} sources</span>
        </div>
      </div>

      <div className="update-tags">
        {update.tags.map(tag => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      <div className="update-actions-footer">
        <button className="btn-dismiss" onClick={() => onDismiss(update.id)}>
          Dismiss
        </button>
        <button className="btn-ok" onClick={() => onAddToTasks(update)}>
          Add to Tasks
        </button>
      </div>
    </div>
  );
};
