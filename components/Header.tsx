
import React from 'react';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <SunIcon />
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-brand-gray-700 ml-3">
          Solar AI Assessor
        </h1>
      </div>
    </header>
  );
};
