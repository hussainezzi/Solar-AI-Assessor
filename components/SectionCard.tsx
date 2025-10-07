
import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <div className="bg-brand-white p-6 rounded-lg shadow-md border border-brand-gray-200">
      <h3 className="text-xl font-heading font-bold text-brand-blue mb-4 border-b border-brand-gray-200 pb-2">{title}</h3>
      {children}
    </div>
  );
};
