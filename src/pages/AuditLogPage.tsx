import React, { useEffect, useState } from 'react';
import type { AuditLog } from '../types';
import { AuditAction } from '../types';
import AuditLogTable from '../components/audit/AuditLogTable';
import { Loader2, AlertCircle, ScrollText } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 1,
    action: AuditAction.ADMIN_LOGIN,
    actor_type: 'admin',
    actor_id: 1,
    target_type: null,
    target_id: null,
    description: 'Admin user logged in.',
    ip_address: '192.168.1.10',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    actor: { name: 'Admin User' },
  },
  {
    id: 2,
    action: AuditAction.ALERT_RESOLVED,
    actor_type: 'admin',
    actor_id: 1,
    target_type: 'alert',
    target_id: 2,
    description: 'Admin resolved alert: "Multiple failed login attempts".',
    ip_address: '192.168.1.10',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    actor: { name: 'Admin User' },
  },
  {
    id: 3,
    action: AuditAction.AD_SYNC_COMPLETED,
    actor_type: 'system',
    actor_id: null,
    target_type: null,
    target_id: null,
    description: 'Active Directory sync completed. 142 employees synced.',
    ip_address: '127.0.0.1',
    created_at: new Date(Date.now() - 14400000).toISOString(),
    actor: null,
  },
  {
    id: 4,
    action: AuditAction.AD_SYNC_FAILED,
    actor_type: 'system',
    actor_id: null,
    target_type: null,
    target_id: null,
    description: 'Active Directory sync failed: Connection timed out.',
    ip_address: '127.0.0.1',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    actor: null,
  },
  {
    id: 5,
    action: AuditAction.EMPLOYEE_VERIFIED,
    actor_type: 'employee',
    actor_id: 101,
    target_type: 'device',
    target_id: 1,
    description: 'Employee verified new device "JDOE-LAPTOP".',
    ip_address: '10.0.5.20',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    actor: { name: 'John Doe' }, // Backend would join this
  },
];
// --- END MOCK DATA ---

const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        
        // --- USE THIS CODE WHEN YOUR BACKEND IS READY ---
        // const response = await auditLogService.getAuditLogs();
        // setLogs(response.logs);
        // ------------------------------------------------
        
        // --- USING MOCK DATA FOR NOW ---
        await new Promise(resolve => setTimeout(resolve, 500));
        setLogs(MOCK_AUDIT_LOGS);
        // ---------------------------------
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch audit logs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Audit Log
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

      {!loading && !error && logs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <ScrollText className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            No Audit Logs Found
          </h3>
          <p className="text-gray-500 mt-1">
            No system-wide actions have been logged yet.
          </p>
        </div>
      )}
      
      {!loading && !error && logs.length > 0 && (
        <AuditLogTable logs={logs} />
      )}
    </div>
  );
};

export default AuditLogPage;