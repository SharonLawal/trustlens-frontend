import React from 'react';
import type { ADConfig } from '../../types';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Mock data for this component
const mockConfig: ADConfig = {
  company_name: 'Your Company Inc.',
  domain: 'company.local',
  ad_type: 'hybrid',
  last_sync: new Date(Date.now() - 3600000).toISOString(),
  sync_status: 'HEALTHY',
};

const ADConnection: React.FC = () => {
  const isHealthy = mockConfig.sync_status === 'HEALTHY';

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Active Directory Sync
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div
          className={`p-4 rounded-md flex items-center ${
            isHealthy ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {isHealthy ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-600" />
          )}
          <span
            className={`ml-3 text-sm font-medium ${
              isHealthy ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {isHealthy
              ? 'Connection healthy. Sync is active.'
              : 'Connection error. Sync has failed.'}
          </span>
        </div>
        
        <dl className="divide-y divide-gray-200">
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd className="text-sm text-gray-900 col-span-2">{mockConfig.company_name}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Domain</dt>
            <dd className="text-sm text-gray-900 col-span-2">{mockConfig.domain}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">AD Type</dt>
            <dd className="text-sm text-gray-900 col-span-2">{mockConfig.ad_type.toUpperCase()}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Last Sync</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {new Date(mockConfig.last_sync).toLocaleString()}
            </dd>
          </div>
        </dl>
        
        <div className="text-right">
          <button
            disabled // Disabled for the hackathon
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Manage Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ADConnection;