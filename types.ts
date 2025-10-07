
export enum WorkflowStep {
  INTAKE = 'INTAKE',
  ASSESSMENT = 'ASSESSMENT',
}

export interface ClientData {
  address: string;
  energyNeeds: string;
}

export interface AssessmentData {
  solarScore: string | null;
  rooftopLayoutUrl: string | null;
  proposalSummary: string | null;
  savingsInfographicUrl: string | null;
}
