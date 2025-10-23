import React from 'react';
import type { AdminAccount } from '../../types';

// Mock data for this component
const mockAdmins: AdminAccount[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'super_admin',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 2,
    name: 'Security Analyst',
    email: 'analyst@company.com',
    role: 'analyst',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 3,
    name: 'Compliance Viewer',
    email: 'viewer@company.com',
    role: 'viewer',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const AdminManagement: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Admin Accounts
        </h3>
        <button
          disabled // Disabled for the hackathon
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Invite New Admin
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Added
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAdmins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {admin.name}
                  </div>
                  <div className="text-sm text-gray-500">{admin.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {admin.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(admin.created_at).toLocaleDateString()}
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

export default AdminManagement;