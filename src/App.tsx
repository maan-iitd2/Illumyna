import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SideNav } from './components/SideNav';
import { HomeScreen } from './screens/HomeScreen';
import { TaskScreen } from './screens/TaskScreen';
import { KnowledgeBaseScreen } from './screens/KnowledgeBaseScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import './App.css';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className="app-container">
        <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen onMenuClick={() => setIsNavOpen(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/task" element={<TaskScreen onMenuClick={() => setIsNavOpen(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/knowledge" element={<KnowledgeBaseScreen onMenuClick={() => setIsNavOpen(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/profile" element={<ProfileScreen onMenuClick={() => setIsNavOpen(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
