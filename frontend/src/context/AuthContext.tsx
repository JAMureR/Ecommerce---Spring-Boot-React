import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    const token = localStorage.getItem('token');

    setState({
      user,
      token,
      isAuthenticated: !!token,
      loading: false,
    });
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await authService.login(email, password);

    setState({
      user,
      token,
      isAuthenticated: true,
      loading: false,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    await authService.register(name, email, password);
    await login(email, password);
  };

  const logout = async () => {
    await authService.logout();

    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};