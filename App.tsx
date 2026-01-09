import React, { useState } from 'react';
import { AuthState, User } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    user: null
  });

  const handleClientLogin = (user: User) => {
    setAuth({
      isAuthenticated: true,
      isAdmin: false,
      user
    });
  };

  const handleAdminLogin = () => {
    setAuth({
      isAuthenticated: true,
      isAdmin: true,
      user: null
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      isAdmin: false,
      user: null
    });
  };

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleClientLogin} onAdminLogin={handleAdminLogin} />;
  }

  if (auth.isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Fallback check: if authenticated but not admin and no user, logout
  if (!auth.user) {
    handleLogout();
    return null;
  }

  return <Dashboard user={auth.user} onLogout={handleLogout} />;
};

export default App;