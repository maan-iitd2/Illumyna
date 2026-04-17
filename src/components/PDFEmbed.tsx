import React, { useRef } from 'react';
import { ExternalLink, Maximize } from 'lucide-react';
import './MediaEmbed.css';

interface Props {
  url: string;
}

export const PDFEmbed: React.FC<Props> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
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
      <div className="pdf-fallback">
        <p style={{ margin: 0 }}>If the PDF isn't rendering gracefully in your browser, try opening it strictly.</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleFullScreen} className="btn-fallback" style={{ cursor: 'pointer', border: 'none' }}>
            <Maximize size={16} /> Full Screen
          </button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn-fallback">
            <ExternalLink size={16} /> Open PDF in new tab
          </a>
        </div>
      </div>
    </div>
  );
};
