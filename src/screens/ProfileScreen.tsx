import React, { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import type { ScreenProps } from './HomeScreen';
import './ProfileScreen.css';

export const ProfileScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const [profile, setProfile] = useState({
    targetRole: 'Software Engineer',
    currentLevel: 'Intermediate',
    interests: 'AI, Web Development',
    weeklyCommitment: '10 hours',
    description: 'Looking to transition into a full-stack role with focus on React and Node.js'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

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
          <span className="stat-value">12h</span>
          <span className="stat-label">This Week</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">6</span>
          <span className="stat-label">Tasks Done</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">85%</span>
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
            value={profile.targetRole} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentLevel">Current Level</label>
          <input 
            type="text" 
            id="currentLevel" 
            name="currentLevel" 
            value={profile.currentLevel} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="interests">Interests (comma separated)</label>
          <input 
            type="text" 
            id="interests" 
            name="interests" 
            value={profile.interests} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="weeklyCommitment">Weekly Time Commitment</label>
          <input 
            type="text" 
            id="weeklyCommitment" 
            name="weeklyCommitment" 
            value={profile.weeklyCommitment} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Bio / Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={profile.description} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
        
        <button className="btn-save">Save Profile</button>
      </div>
    </div>
  );
};
