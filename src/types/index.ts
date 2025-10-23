// -------------------- Activity Types --------------------
export type ActionType = 
  | 'file_access'
  | 'file_download'
  | 'file_upload'
  | 'file_delete'
  | 'login'
  | 'logout'
  | 'failed_login'
  | 'email_sent'
  | 'system_access'
  | 'privilege_escallation' // Note: Typo 'escallation' kept to match backend model
  | 'data_exfiltration'
  | 'suspicious_activity';

export interface ActivityEmployee {
  id: number;
  name: string;
  email: string;
  department: string | null;
}
export interface Activity {
  id: number;
  employee_id: number;
  device_id: number | null;
  action_type: ActionType; // Uses the type alias
  description: string;
  risk_score: number;
  flagged: boolean;
  created_at: string;
  employee: ActivityEmployee;
}
export interface ActivityFeedResponse {
  activities: Activity[];
  total: number;
}

// -------------------- Alert Types --------------------
// Replaced enum with string literal union type
export type Severity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type AlertStatus = 'OPEN' | 'RESOLVED' | 'DISMISSED';
export interface Alert {
  id: number;
  employee_id: number;
  activity_id: number | null;
  description: string;
  severity: Severity; // Uses the type alias
  risk_score: number;
  created_at: string;
  status: AlertStatus;
  employee: {
    id: number;
    name: string;
    email: string;
  };
  activity?: Activity;
}
export interface AlertListResponse {
  alerts: Alert[];
  total: number;
}

// -------------------- Employee Types --------------------
export interface Employee {
  id: number;
  company_id: number;
  ad_user_id: string;
  name: string;
  email: string;
  username: string;
  department: string | null;
  job_title: string | null;
  is_active: boolean;
  last_login: string | null;
  current_risk_score: number;
}
export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
}

// -------------------- Dashboard Types --------------------
export interface RiskTrendPoint {
  date: string;
  average_risk_score: number;
}
export interface DashboardStats {
  total_employees: number;
  active_alerts: number;
  high_risk_employees: number;
  total_activities_today: number;
}
export interface DashboardData {
  stats: DashboardStats;
  risk_trend: RiskTrendPoint[];
  recent_high_risk_activities: Activity[];
  open_alerts: Alert[];
}

// -------------------- AuditLog Types --------------------
export type AuditAction = 
  | 'employee_synced'
  | 'employee_verified'
  | 'employee_deactivated'
  | 'alert_created'
  | 'alert_resolved'
  | 'alert_dismissed'
  | 'activity_logged'
  | 'activity_flagged'
  | 'risk_threshold_updated'
  | 'notification_sent'
  | 'admin_login'
  | 'admin_action'
  | 'system_config_changed'
  | 'ad_sync_completed'
  | 'ad_sync_failed';

export interface AuditLog {
  id: number;
  action: AuditAction; // Uses the type alias
  actor_type: string;
  actor_id: number | null;
  target_type: string | null;
  target_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: string;
  actor: {
    name: string;
  } | null;
}
export interface AuditLogResponse {
  logs: AuditLog[];
  total: number;
}

// -------------------- Settings Types --------------------
export interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'analyst' | 'viewer';
  created_at: string;
}
export interface RiskRule {
  id: string;
  action: string;
  description: string;
  current_score: number;
  is_active: boolean;
}
export interface ADConfig {
  company_name: string;
  domain: string;
  ad_type: 'azure_ad' | 'on_premise' | 'hybrid';
  last_sync: string;
  sync_status: 'HEALTHY' | 'ERROR';
}