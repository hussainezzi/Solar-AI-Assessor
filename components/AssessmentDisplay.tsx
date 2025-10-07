
import React from 'react';
import type { AssessmentData, ClientData } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { SectionCard } from './SectionCard';

interface AssessmentDisplayProps {
  data: AssessmentData;
  clientData: ClientData;
  onVisualizeSavings: () => void;
  isSavingsLoading: boolean;
  onReset: () => void;
}

const parseMarkdown = (text: string) => {
    return text
        .replace(/### (.*)/g, '<h3 class="text-xl font-heading font-bold text-brand-blue mt-4 mb-2">$1</h3>')
        .replace(/\* (.*)/g, '<li class="ml-5 list-disc">$1</li>')
        .replace(/(\r\n|\n|\r)/gm, '<br>');
};


export const AssessmentDisplay: React.FC<AssessmentDisplayProps> = ({ data, clientData, onVisualizeSavings, isSavingsLoading, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-heading font-bold text-brand-gray-700">Assessment for:</h2>
          <p className="text-lg text-brand-gray-500">{clientData.address}</p>
        </div>
        <button
          onClick={onReset}
          className="bg-brand-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors duration-300"
        >
            Start New Assessment
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <SectionCard title="Preliminary Rooftop Layout">
            {data.rooftopLayoutUrl ? (
              <img src={data.rooftopLayoutUrl} alt="Rooftop Layout" className="rounded-md w-full object-cover" />
            ) : (
              <div className="w-full h-64 bg-brand-gray-200 animate-pulse rounded-md"></div>
            )}
          </SectionCard>

          <SectionCard title="Personalized Initial Proposal Summary">
             {data.proposalSummary ? (
                <div 
                    className="prose max-w-none text-brand-gray-700"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(data.proposalSummary) }}
                ></div>
             ) : (
                <div className="space-y-4">
                    <div className="w-1/3 h-6 bg-brand-gray-200 animate-pulse rounded"></div>
                    <div className="w-full h-4 bg-brand-gray-200 animate-pulse rounded"></div>
                    <div className="w-5/6 h-4 bg-brand-gray-200 animate-pulse rounded"></div>
                    <div className="w-full h-4 bg-brand-gray-200 animate-pulse rounded"></div>
                </div>
             )}
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <SectionCard title="Solar Potential Score">
            {data.solarScore ? (
              <p className="text-7xl font-bold text-brand-blue text-center">{data.solarScore}<span className="text-3xl text-brand-gray-500">/100</span></p>
            ) : (
              <div className="w-32 h-20 mx-auto bg-brand-gray-200 animate-pulse rounded-md"></div>
            )}
          </SectionCard>
          
          <SectionCard title="Visualize Savings">
              {!data.savingsInfographicUrl ? (
                <button
                    onClick={onVisualizeSavings}
                    disabled={isSavingsLoading}
                    className="w-full flex justify-center items-center bg-brand-orange text-white font-bold py-3 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                {isSavingsLoading ? <><LoadingSpinner size="h-5 w-5" /> <span className="ml-2">Generating...</span></> : 'Generate Savings Infographic'}
                </button>
              ) : (
                 <img src={data.savingsInfographicUrl} alt="Savings Infographic" className="rounded-md w-full object-cover mt-4" />
              )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};
