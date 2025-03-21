import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="gradient-bg shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-neon-blue" />
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              FinanceTracker
            </span>
          </NavLink>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link flex items-center space-x-2 ${isActive ? 'active' : ''}`
              }
            >
              <Activity className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                `nav-link flex items-center space-x-2 ${isActive ? 'active' : ''}`
              }
            >
              <TrendingUp className="w-5 h-5" />
              <span>Income</span>
            </NavLink>
            <NavLink
              to="/expense"
              className={({ isActive }) =>
                `nav-link flex items-center space-x-2 ${isActive ? 'active' : ''}`
              }
            >
              <TrendingDown className="w-5 h-5" />
              <span>Expense</span>
            </NavLink>
            {user ? (
              <button
                onClick={signOut}
                className="button-primary"
              >
                Sign Out
              </button>
            ) : (
              <NavLink to="/login" className="button-primary">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;