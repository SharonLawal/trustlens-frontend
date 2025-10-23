import React from 'react';
import { Bell, UserCircle, LogOut } from 'lucide-react';
// We'll import these later when we build auth
// import { useAuthStore } from '../../store/authStore';
// import { authService } from '../../services/authService';

const Header: React.FC = () => {
  // const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    // authService.logout();
    // window.location.href = '/login';
    alert('Logout clicked!'); // Placeholder
  };

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        {/* We can add a page title or search bar here later */}
        <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center space-x-2">
          <UserCircle className="h-8 w-8 text-gray-600" />
          <span className="hidden text-gray-700 sm:block">
            {/* {user?.name || 'Admin User'} */}
            Admin User
          </span>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Logout</span>
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;