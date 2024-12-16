import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/firebase';
import toast from 'react-hot-toast';

interface UserMenuProps {
  onLoginClick: () => void;
}

export function UserMenu({ onLoginClick }: UserMenuProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Logged in as</span>
            <span className="ml-1 font-medium">{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <button
          onClick={onLoginClick}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <User size={16} />
          <span>Login</span>
        </button>
      )}
    </div>
  );
}