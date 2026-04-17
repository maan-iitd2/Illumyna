import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Menu, Moon, Sun } from 'lucide-react';
import type { ScreenProps } from './HomeScreen';
import './TaskScreen.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const TaskScreen: React.FC<ScreenProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), text: inputValue, isUser: true };
    setMessages([...messages, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const newAiMsg: Message = { id: (Date.now() + 1).toString(), text: "This is a mocked AI response based on your context. Here to help you study!", isUser: false };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="task-screen fade-in">
      <div className="screen-header">
        <div className="header-left">
          <button className="icon-button" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <div className="task-header-title" onClick={() => setIsHeaderOpen(!isHeaderOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>Task 1</h2>
            <ChevronDown size={20} className={`chevron ${isHeaderOpen ? 'open' : ''}`} />
          </div>
        </div>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {isHeaderOpen && (
        <div className="task-content">
          <div className="media-placeholder">
            <p className="placeholder-text">
              This will be used to display the studying material, which can either be a pdf or a youtube video which will open up in this space only.
            </p>
          </div>
        </div>
      )}

      <div className="doubt-solver">
        <div className="chat-history">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.isUser ? 'user' : 'ai'}`}>
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
