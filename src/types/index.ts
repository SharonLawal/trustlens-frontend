// This enum must match your backend and agent
export const enum ActionType {
  FILE_ACCESS = 'file_access',
  FILE_DOWNLOAD = 'file_download',
  FILE_UPLOAD = 'file_upload',
  FILE_DELETE = 'file_delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  FAILED_LOGIN = 'failed_login',
  EMAIL_SENT = 'email_sent',
  SYSTEM_ACCESS = 'system_access',
  PRIVILEGE_ESCALATION = 'privilege_escallation',
  DATA_EXFILTRATION = 'data_exfiltration',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
}

// A simple type for the employee attached to an activity
export interface ActivityEmployee {
  id: number;
  name: string;
  email: string;
  department: string | null;
}

// The main Activity object from your backend
export interface Activity {
  id: number;
  employee_id: number;
  device_id: number | null;
  action_type: ActionType;
  description: string;
  risk_score: number;
  flagged: boolean;
  created_at: string; // ISO date string
  employee: ActivityEmployee; // We'll join this data in the backend
}

// Type for the API response
export interface ActivityFeedResponse {
  activities: Activity[];
  total: number;
}

// From your backend models.py
export const enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// We'll define a client-side status for managing alerts
export type AlertStatus = 'OPEN' | 'RESOLVED' | 'DISMISSED';

// The main Alert object from your backend
export interface Alert {
  id: number;
  employee_id: number;
  activity_id: number | null;
  description: string;
  severity: Severity;
  risk_score: number;
  created_at: string; // ISO date string
  
  // This is the client-side status we'll manage
  status: AlertStatus;

  // We'll join this data in the backend
  employee: {
    id: number;
    name: string;
    email: string;
  };
  
  // We can also join the related activity
  activity?: Activity; 
}

// Type for the API response
export interface AlertListResponse {
  alerts: Alert[];
  total: number;
}

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
  last_login: string | null; // ISO date string
  
  // This is a computed value we'd get from the backend
  current_risk_score: number;
}

// Type for the API response
export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
}

export interface RiskTrendPoint {
  date: string;
  average_risk_score: number;
}

// Data for the top "Stats Cards"
export interface DashboardStats {
  total_employees: number;
  active_alerts: number;
  high_risk_employees: number;
  total_activities_today: number;
}

// The combined response from a single /dashboard endpoint
export interface DashboardData {
  stats: DashboardStats;
  risk_trend: RiskTrendPoint[];
  recent_high_risk_activities: Activity[]; // Reuse Activity type
  open_alerts: Alert[]; // Reuse Alert type
}

export const enum AuditAction {
  EMPLOYEE_SYNCED = 'employee_synced',
  EMPLOYEE_VERIFIED = 'employee_verified',
  EMPLOYEE_DEACTIVATED = 'employee_deactivated',
  ALERT_CREATED = 'alert_created',
  ALERT_RESOLVED = 'alert_resolved',
  ALERT_DISMISSED = 'alert_dismissed',
  ACTIVITY_LOGGED = 'activity_logged',
  ACTIVITY_FLAGGED = 'activity_flagged',
  RISK_THRESHOLD_UPDATED = 'risk_threshold_updated',
  NOTIFICATION_SENT = 'notification_sent',
  ADMIN_LOGIN = 'admin_login',
  ADMIN_ACTION = 'admin_action',
  SYSTEM_CONFIG_CHANGED = 'system_config_changed',
  AD_SYNC_COMPLETED = 'ad_sync_completed',
  AD_SYNC_FAILED = 'ad_sync_failed',
}

// The main AuditLog object from your backend
export interface AuditLog {
  id: number;
  action: AuditAction;
  actor_type: string; // "admin", "system", "employee"
  actor_id: number | null;
  target_type: string | null;
  target_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: string; // ISO date string

  // We'll join this data in the backend
  actor: {
    name: string;
  } | null;
}

// Type for the API response
export interface AuditLogResponse {
  logs: AuditLog[];
  total: number;
}

export interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'analyst' | 'viewer';
  created_at: string;
}

// This is a mock type for demonstrating configurable risk rules
export interface RiskRule {
  id: string;
  action: string;
  description: string;
  current_score: number; // The risk score it assigns
  is_active: boolean;
}

// This is a mock type for the AD connection status
export interface ADConfig {
  company_name: string;
  domain: string;
  ad_type: 'azure_ad' | 'on_premise' | 'hybrid';
  last_sync: string;
  sync_status: 'HEALTHY' | 'ERROR';
}