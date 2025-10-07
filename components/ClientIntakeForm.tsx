
import React, { useState } from 'react';
import type { ClientData } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface ClientIntakeFormProps {
  onSubmit: (data: ClientData) => void;
  isLoading: boolean;
}

export const ClientIntakeForm: React.FC<ClientIntakeFormProps> = ({ onSubmit, isLoading }) => {
  const [address, setAddress] = useState('');
  const [energyNeeds, setEnergyNeeds] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && energyNeeds) {
      onSubmit({ address, energyNeeds });
    }
  };

  return (
    <div className="bg-brand-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-brand-blue">
      <h2 className="text-2xl font-heading font-bold text-brand-blue mb-1">Client Intake</h2>
      <p className="text-brand-gray-500 mb-6">Enter client details to begin the AI-powered assessment.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-brand-gray-700 mb-2">Client's Full Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
            placeholder="e.g., 1600 Amphitheatre Parkway, Mountain View, CA"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="energy-needs" className="block text-sm font-medium text-brand-gray-700 mb-2">Basic Energy Needs</label>
          <input
            type="text"
            id="energy-needs"
            value={energyNeeds}
            onChange={(e) => setEnergyNeeds(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
            placeholder="e.g., High usage, 2 adults, 2 kids, EV charger"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !address || !energyNeeds}
          className="w-full flex justify-center items-center bg-brand-orange text-white font-bold py-3 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? <><LoadingSpinner size="h-5 w-5" /> <span className="ml-2">Analyzing...</span></> : 'Start Assessment'}
        </button>
      </form>
    </div>
  );
};
