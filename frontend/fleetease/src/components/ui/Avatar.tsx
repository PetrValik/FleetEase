import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback }) => {
  return (
    <span className="avatar">
      {src ? (
        <img src={src} alt={alt || ''} />
      ) : (
        <span>{fallback}</span>
      )}
    </span>
  );
};

