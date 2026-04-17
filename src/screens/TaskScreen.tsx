import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Menu, Moon, Sun, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ScreenProps } from './HomeScreen';
import { useTasksStore } from '../store/tasksStore';
import { useChatStore } from '../store/chatStore';
import type { ChatMessage } from '../types';
import { YoutubeEmbed } from '../components/YoutubeEmbed';
import { PDFEmbed } from '../components/PDFEmbed';
import './TaskScreen.css';

export const TaskScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { tasks, activeTaskId, completeTask } = useTasksStore();
  const activeTask = tasks.find(t => t.id === activeTaskId);

  const { messagesByTaskId, addMessage } = useChatStore();
  const messages = activeTaskId ? (messagesByTaskId[activeTaskId] || []) : [];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!activeTask) {
    return (
      <div className="task-screen fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>No active task.</p>
          <button style={{ color: 'var(--accent)',  background: 'none', border: 'none', fontSize: '14px', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Go to Home to pick one
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeTaskId) return;

    const newUserMsg: ChatMessage = { 
      id: Date.now().toString(), 
      taskId: activeTaskId,
      text: inputValue, 
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    addMessage(activeTaskId, newUserMsg);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const newAiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        taskId: activeTaskId,
        text: "This is a mocked AI response based on your context. Here to help you study!", 
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      addMessage(activeTaskId, newAiMsg);
      setIsTyping(false);
    }, 1500);
  };

  const handleComplete = () => {
    if (activeTaskId) {
      completeTask(activeTaskId);
    }
  };

  return (
    <div className="task-screen fade-in">
      <div className="screen-header" style={{ marginBottom: '12px' }}>
        <div className="header-left">
          <button className="icon-button" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <div className="task-header-title" onClick={() => setIsHeaderOpen(!isHeaderOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', maxWidth: '250px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{activeTask.title}</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {activeTask.topic} • {Math.floor(activeTask.timeSpentSeconds / 60)} min spent
              </span>
            </div>
            <ChevronDown size={20} className={`chevron ${isHeaderOpen ? 'open' : ''}`} />
          </div>
        </div>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      <div style={{ padding: '0 16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="progress-bar-container" style={{ flex: 1, height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div className="progress-bar-fill" style={{ width: `${activeTask.progressPercent}%`, height: '100%', backgroundColor: 'var(--accent)', borderRadius: '3px' }}></div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{activeTask.progressPercent}%</span>
        </div>
        <button 
          onClick={handleComplete}
          disabled={activeTask.status === 'completed'}
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 600,
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: activeTask.status === 'completed' ? 'var(--bg-secondary)' : 'var(--accent)',
            color: activeTask.status === 'completed' ? 'var(--text-secondary)' : 'var(--bg-primary)',
            cursor: activeTask.status === 'completed' ? 'default' : 'pointer',
            border: 'none',
          }}
        >
          <CheckCircle size={14} />
          {activeTask.status === 'completed' ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      {isHeaderOpen && (
        <div className="task-content" style={{ padding: '0 16px' }}>
          {activeTask.mediaType === 'youtube' && <YoutubeEmbed url={activeTask.mediaUrl} />}
          {activeTask.mediaType === 'pdf' && <PDFEmbed url={activeTask.mediaUrl} />}
          {activeTask.mediaType === 'article' && (
            <div className="media-placeholder">
              <p className="placeholder-text">
                This material is an article format and is best viewed externally.<br/>
                <a href={activeTask.mediaUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline', marginTop: '16px', display: 'inline-block' }}>
                  Read External Article
                </a>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="doubt-solver">
        <div className="chat-history">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
              <div className="chat-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble-wrapper ai">
              <div className="chat-bubble typing-indicator">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Doubts solver" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="btn-send">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
