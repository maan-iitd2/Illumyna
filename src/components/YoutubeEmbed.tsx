import React from 'react';
import './MediaEmbed.css';

interface Props {
  url: string;
}

export const YoutubeEmbed: React.FC<Props> = ({ url }) => {
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = extractVideoId(url);

  if (!videoId) {
    return <div className="media-error fade-in">Invalid YouTube URL. Cannot mount viewer.</div>;
  }

  return (
    <div className="media-container youtube-container fade-in">
      <iframe
        className="media-iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
