import React, { useEffect, useState } from 'react';
import type { Employee } from '../types';
import EmployeeList from '../components/employees/EmployeeList';
import { Loader2, AlertCircle, Users } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 101,
    company_id: 1,
    ad_user_id: 'john.doe_ad',
    name: 'John Doe',
    email: 'john.doe@company.com',
    username: 'jdoe',
    department: 'Sales',
    job_title: 'Sales Executive',
    is_active: true,
    last_login: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    current_risk_score: 0.8, // High risk
  },
  {
    id: 102,
    company_id: 1,
    ad_user_id: 'jane.smith_ad',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    username: 'jsmith',
    department: 'Engineering',
    job_title: 'Software Engineer',
    is_active: true,
    last_login: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    current_risk_score: 0.2, // Low risk
  },
  {
    id: 103,
    company_id: 1,
    ad_user_id: 'bob.johnson_ad',
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    username: 'bjohnson',
    department: 'Marketing',
    job_title: 'Marketing Manager',
    is_active: false,
    last_login: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    current_risk_score: 0.5, // Medium risk
  },
];
// --- END MOCK DATA ---

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        
        // --- USE THIS CODE WHEN YOUR BACKEND IS READY ---
        // const response = await employeeService.getEmployees();
        // setEmployees(response.employees);
        // ------------------------------------------------
        
        // --- USING MOCK DATA FOR NOW ---
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setEmployees(MOCK_EMPLOYEES);
        // ---------------------------------
        
        setError(null);
      } catch (err)
 {
        setError('Failed to fetch employees. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Employee Management
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 mt-4">
            An error occurred
          </h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            No Employees Found
          </h3>
          <p className="text-gray-500 mt-1">
            Employees have not been synced from Active Directory yet.
          </p>
        </div>
      )}
      
      {!loading && !error && employees.length > 0 && (
        <EmployeeList employees={employees} />
      )}
    </div>
  );
};

export default EmployeesPage;