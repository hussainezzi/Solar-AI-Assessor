import React, { useState, useCallback } from 'react';
import { ClientIntakeForm } from './components/ClientIntakeForm';
import { AssessmentDisplay } from './components/AssessmentDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WorkflowSteps } from './components/WorkflowSteps';
import type { ClientData, AssessmentData } from './types';
import { WorkflowStep } from './types';
import { getSolarPotentialScore, generateRooftopLayout, generateProposalSummary, generateSavingsInfographic } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<WorkflowStep>(WorkflowStep.INTAKE);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    solarScore: null,
    rooftopLayoutUrl: null,
    proposalSummary: null,
    savingsInfographicUrl: null,
  });
  const [loadingStates, setLoadingStates] = useState({
    assessment: false,
    savings: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleIntakeSubmit = useCallback(async (data: ClientData) => {
    setClientData(data);
    setStep(WorkflowStep.ASSESSMENT);
    setLoadingStates({ assessment: true, savings: false });
    setError(null);
    setAssessmentData({
      solarScore: null,
      rooftopLayoutUrl: null,
      proposalSummary: null,
      savingsInfographicUrl: null,
    });

    try {
      // Run in parallel
      const [score, layoutUrl] = await Promise.all([
        getSolarPotentialScore(data.address, data.energyNeeds),
        generateRooftopLayout(data.address)
      ]);
      
      setAssessmentData(prev => ({ ...prev, solarScore: score, rooftopLayoutUrl: layoutUrl }));

      const summary = await generateProposalSummary(score, data.energyNeeds);
      setAssessmentData(prev => ({ ...prev, proposalSummary: summary }));
      
    } catch (err: any) {
      console.error(err);
      if (err.message === "API_KEY_MISSING") {
        setError('The Gemini API Key is not configured. Please ensure it is set correctly and try again.');
      } else {
        setError('An error occurred while generating the assessment. Please try again.');
      }
      setStep(WorkflowStep.INTAKE);
    } finally {
      setLoadingStates(prev => ({...prev, assessment: false}));
    }
  }, []);

  const handleVisualizeSavings = useCallback(async () => {
    if (!assessmentData.solarScore || !clientData?.energyNeeds) return;
    setLoadingStates(prev => ({...prev, savings: true}));
    setError(null);

    try {
      const infographicUrl = await generateSavingsInfographic(assessmentData.solarScore, clientData.energyNeeds);
      setAssessmentData(prev => ({ ...prev, savingsInfographicUrl: infographicUrl }));
    } catch (err: any) {
      console.error(err);
      if (err.message === "API_KEY_MISSING") {
        setError('The Gemini API Key is not configured. Please ensure it is set correctly and try again.');
      } else {
        setError('Failed to generate savings visualization. Please try again.');
      }
    } finally {
      setLoadingStates(prev => ({...prev, savings: false}));
    }
  }, [assessmentData.solarScore, clientData?.energyNeeds]);
  
  const handleReset = () => {
    setStep(WorkflowStep.INTAKE);
    setClientData(null);
    setAssessmentData({
      solarScore: null,
      rooftopLayoutUrl: null,
      proposalSummary: null,
      savingsInfographicUrl: null,
    });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-brand-gray-100 font-body text-brand-gray-700">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {step === WorkflowStep.INTAKE && (
          <>
            <WorkflowSteps />
            <ClientIntakeForm onSubmit={handleIntakeSubmit} isLoading={loadingStates.assessment} />
          </>
        )}
        
        {loadingStates.assessment && step === WorkflowStep.ASSESSMENT && (
           <div className="flex flex-col items-center justify-center bg-brand-white p-8 rounded-lg shadow-md">
            <LoadingSpinner />
            <p className="mt-4 text-lg font-medium text-brand-blue">Generating your Solar Assessment...</p>
            <p className="text-brand-gray-500">This may take a moment.</p>
          </div>
        )}

        {step === WorkflowStep.ASSESSMENT && !loadingStates.assessment && (
          <AssessmentDisplay
            data={assessmentData}
            clientData={clientData!}
            onVisualizeSavings={handleVisualizeSavings}
            isSavingsLoading={loadingStates.savings}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;