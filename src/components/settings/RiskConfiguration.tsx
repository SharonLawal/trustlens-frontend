import React from 'react';
import type { RiskRule } from '../../types';

// Mock data for this component
const mockRules: RiskRule[] = [
  {
    id: 'rule_1',
    action: 'Sensitive File Download',
    description: 'Downloading any file marked "Confidential"',
    current_score: 0.9,
    is_active: true,
  },
  {
    id: 'rule_2',
    action: 'Multiple Failed Logins',
    description: '5 or more failed logins in 10 minutes',
    current_score: 0.8,
    is_active: true,
  },
  {
    id: 'rule_3',
    action: 'Unusual After-Hours Activity',
    description: 'Any file access between 10 PM and 6 AM',
    current_score: 0.6,
    is_active: true,
  },
  {
    id: 'rule_4',
    action: 'USB Device Insertion',
    description: 'Plugging in any external USB storage',
    current_score: 0.5,
    is_active: false,
  },
];

const RiskConfiguration: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Risk Engine Rules
        </h3>
        <button
          disabled // Disabled for the hackathon
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Add New Rule
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockRules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {rule.action}
                  </div>
                  <div className="text-sm text-gray-500">
                    {rule.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {rule.current_score.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rule.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {rule.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <a href="#" className="text-gray-400 cursor-not-allowed">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskConfiguration;