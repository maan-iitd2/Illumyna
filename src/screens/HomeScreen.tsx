import React from 'react';
import { ChevronRight, Edit3, Menu, Moon, Sun } from 'lucide-react';
import './HomeScreen.css';

export interface ScreenProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const HomeScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
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
        <div className="progress-card">
          <div className="progress-info">
            <span className="task-title">Prev Task 1</span>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>
        <div className="progress-card">
          <div className="progress-info">
            <span className="task-title">Prev Task 2</span>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>
      </div>

      <div className="updates-feed">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="update-card">
            <p className="update-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="update-actions">
              <button className="btn-dismiss">Dismiss</button>
              <button className="btn-ok">Ok</button>
            </div>
          </div>
        ))}
      </div>

      <div className="floating-action-wrapper">
        <button className="btn-fetch-updates">
          <span>Fetch Updates</span>
          <Edit3 size={18} />
        </button>
      </div>
    </div>
  );
};
