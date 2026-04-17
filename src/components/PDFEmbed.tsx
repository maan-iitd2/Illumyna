import React, { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import './MediaEmbed.css';

interface Props {
  url: string;
}

export const PDFEmbed: React.FC<Props> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (!url) {
    return <div className="media-error fade-in">Invalid PDF URL.</div>;
  }

  return (
    <div ref={containerRef} className="media-container pdf-container fade-in">
      <iframe
        className="media-iframe"
        src={url}
        title="PDF Document Viewer"
      ></iframe>
      <button
        className="pdf-fullscreen-btn"
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
};
