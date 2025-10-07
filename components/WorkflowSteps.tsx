import React from 'react';

const FormIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const MagicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const steps = [
    { icon: <FormIcon />, title: "1. Client Intake", description: "Enter property address and energy needs." },
    { icon: <MagicIcon />, title: "2. AI Assessment", description: "Generate solar score, rooftop layout, and proposal." },
    { icon: <ChartIcon />, title: "3. Visualize Savings", description: "Create a custom infographic of potential savings." }
];

export const WorkflowSteps: React.FC = () => {
  return (
    <div className="mb-8 bg-brand-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-brand-orange">
      <h2 className="text-2xl font-heading font-bold text-brand-blue mb-6 text-center">How It Works</h2>
      <div className="relative flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Dashed line connector for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
                <line x1="0" y1="0" x2="100" y2="0" stroke="rgb(209 213 219)" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
        </div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex-1 text-center flex flex-col items-center">
            <div className="bg-brand-blue text-white rounded-full h-16 w-16 flex items-center justify-center mb-3 ring-4 ring-brand-white">
              {step.icon}
            </div>
            <h3 className="font-bold font-heading text-lg text-brand-gray-700">{step.title}</h3>
            <p className="text-sm text-brand-gray-500 max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};