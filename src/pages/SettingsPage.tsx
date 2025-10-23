import React, { useState } from 'react';
import AdminManagement from '../components/settings/AdminManagement';
import RiskConfiguration from '../components/settings/RiskConfiguration';
import ADConnection from '../components/settings/ADConnection';

type SettingsTab = 'admins' | 'risk' | 'connection';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('admins');

  const tabs = [
    { id: 'admins', label: 'Admin Management' },
    { id: 'risk', label: 'Risk Configuration' },
    { id: 'connection', label: 'AD Connection' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'admins' && <AdminManagement />}
        {activeTab === 'risk' && <RiskConfiguration />}
        {activeTab === 'connection' && <ADConnection />}
      </div>
    </div>
  );
};

export default SettingsPage;