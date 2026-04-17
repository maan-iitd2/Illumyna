import React from 'react';
import { ChevronRight, Edit3, Menu, Moon, Sun, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUpdatesStore } from '../store/updatesStore';
import { useTasksStore } from '../store/tasksStore';
import { UpdateCard } from '../components/UpdateCard';
import type { Update, Task } from '../types';
import './HomeScreen.css';

export interface ScreenProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const HomeScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { updates, isLoading, dismissUpdate, convertUpdate } = useUpdatesStore();
  const { tasks, setActiveTask, addTask } = useTasksStore();

  const newUpdates = updates.filter(u => u.status === 'new');
  // Maximum 3 tasks inside progress section
  const progressTasks = tasks.slice(0, 3);

  const handleAddToTasks = (update: Update) => {
    // Create new task mapped from Update
    const newTask: Task = {
      id: `t_${Date.now()}`,
      updateId: update.id,
      title: update.title,
      topic: update.tags[0] || 'General',
      mediaType: 'article', // Default placeholder
      mediaUrl: '',
      progressPercent: 0,
      notes: '',
      status: 'active',
      timeSpentSeconds: 0,
      createdAt: new Date().toISOString()
    };
    addTask(newTask);
    setActiveTask(newTask.id);
    convertUpdate(update.id);
    navigate('/task');
  };

  const handleTaskClick = (taskId: string) => {
    setActiveTask(taskId);
    navigate('/task');
  };

  return (
    <div className="home-screen fade-in">
      <div className="screen-header">
        <div className="header-left">
          <button className="icon-button" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <h1 className="greeting">Hey, User</h1>
        </div>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      <div className="progress-section">
        {progressTasks.map(task => (
          <div key={task.id} className="progress-card" onClick={() => handleTaskClick(task.id)}>
            <div className="progress-info">
              <span className="task-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                {task.title}
              </span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${task.progressPercent}%` }}></div>
              </div>
            </div>
            <ChevronRight size={20} className="chevron-icon" />
          </div>
        ))}
      </div>

      <div className="updates-feed">
        {newUpdates.map((update) => (
          <UpdateCard 
            key={update.id} 
            update={update} 
            onDismiss={dismissUpdate} 
            onAddToTasks={handleAddToTasks} 
          />
        ))}
        {newUpdates.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            No new updates available.
          </div>
        )}
      </div>

      <div className="floating-action-wrapper">
        <button className="btn-fetch-updates" disabled={isLoading}>
          {isLoading ? (
            <>
              <span>Fetching...</span>
              <Loader2 size={18} className="spinner" />
            </>
          ) : (
            <>
              <span>Fetch Updates</span>
              <Edit3 size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
