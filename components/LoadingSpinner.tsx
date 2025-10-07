
import React from 'react';

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'h-8 w-8', color = 'border-brand-white' }) => {
  return (
    <div className={`${size} ${color} border-t-transparent border-solid animate-spin rounded-full border-2`}></div>
  );
};
