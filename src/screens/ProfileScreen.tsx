import React, { useState } from 'react';
import { Menu, Moon, Sun, CheckCircle } from 'lucide-react';
import type { ScreenProps } from './HomeScreen';
import { useProfileStore } from '../store/profileStore';
import { useTasksStore } from '../store/tasksStore';
import { TagInput } from '../components/TagInput';
import './ProfileScreen.css';
import type { UserProfile } from '../types';

export const ProfileScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const { profile, updateProfile } = useProfileStore();
  const { tasks } = useTasksStore();
  
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue: any = value;
    if (name === 'weeklyCommitmentHours') {
      finalValue = Number(value) || 0;
    }
    setLocalProfile({ ...localProfile, [name]: finalValue });
  };

  const handleTagsChange = (tags: string[]) => {
    setLocalProfile({ ...localProfile, interests: tags });
  };

  const handleSave = () => {
    updateProfile(localProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalTasks = tasks.length;
  const avgProgress = totalTasks > 0 ? tasks.reduce((sum, t) => sum + t.progressPercent, 0) / totalTasks : 0;
  
  // Weekly commitment derived from all tasks
  const timeSpentHours = tasks.reduce((sum, t) => sum + t.timeSpentSeconds, 0) / 3600;

  return (
    <div className="profile-screen fade-in">
      <div className="screen-header" style={{ marginBottom: '24px' }}>
        <div className="header-left">
          <button className="icon-button" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <h2 className="profile-title" style={{ margin: 0 }}>Profile</h2>
        </div>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-value">{timeSpentHours.toFixed(1)}h</span>
          <span className="stat-label">This Week</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedTasks.length}</span>
          <span className="stat-label">Tasks Done</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{Math.round(avgProgress)}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="profile-form">
        <div className="form-group">
          <label htmlFor="targetRole">Target Role</label>
          <input 
            type="text" 
            id="targetRole" 
            name="targetRole" 
            value={localProfile.targetRole} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentLevel">Current Level</label>
          <select
            id="currentLevel"
            name="currentLevel"
            value={localProfile.currentLevel}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <label>Interests</label>
          <TagInput 
            tags={localProfile.interests || []} 
            onChange={handleTagsChange} 
            placeholder="Type and press Enter, separating by comma" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="weeklyCommitmentHours">Weekly Time Commitment (Hours)</label>
          <input 
            type="number" 
            id="weeklyCommitmentHours" 
            name="weeklyCommitmentHours" 
            value={localProfile.weeklyCommitmentHours} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Bio / Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={localProfile.description || ''} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <button className="btn-save" onClick={handleSave} style={{ margin: 0, padding: '12px 24px', flexShrink: 0 }}>Save Profile</button>
          {isSaved && (
            <span className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-learned)', fontSize: '14px', fontWeight: 500 }}>
              <CheckCircle size={16} /> Saved Successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
