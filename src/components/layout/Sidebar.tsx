import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  Activity, 
  ScrollText, 
  Settings,
  ShieldCheck, // App icon
} from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/alerts', label: 'Alerts', icon: ShieldAlert },
  { href: '/activities', label: 'Activities', icon: Activity },
  { href: '/audit-log', label: 'Audit Log', icon: ScrollText },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="flex w-64 flex-col bg-gray-900 text-gray-200">
      {/* Header */}
      <div className="flex h-16 items-center space-x-2 p-4">
        <ShieldCheck className="h-8 w-8 text-blue-400" />
        <h2 className="text-2xl font-semibold text-white">TrustLens</h2>
      </div>
      
      {/* Nav */}
      <nav className="mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                flex items-center px-4 py-3 mt-1 text-gray-300 
                transition-colors duration-200 transform 
                hover:bg-gray-700 hover:text-white
                ${isActive ? 'bg-gray-700 text-white' : ''}
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="mx-4 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 text-sm text-gray-500">
        © 2025 {new Date().getFullYear()} TrustLens
      </div>
    </aside>
  );
};

export default Sidebar;