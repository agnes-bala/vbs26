// import React from 'react';

// const AppAuthContext = React.createContext();

// export { AppAuthContext };

// src/auth/AppAuthStorage.js
// src/auth/AppAuthContext.js
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { removeAuthInfo, isValidToken } from './AppAuthStorage';

// Create and export the context
export const AppAuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AppAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const checkUserSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('jwt');
      const authInfoStr = localStorage.getItem('authInfo');
      const profile = localStorage.getItem('cachedProfile');
      
      const authInfo = authInfoStr ? JSON.parse(authInfoStr) : {};
      const profileInfo = profile ? JSON.parse(profile) : {};

      if (token && isValidToken(token)) {
        setUser({
          ...authInfo,
          role: authInfo.administrator ? 'admin' : 'user',
          isProfileCompleted: !!(authInfo.fullName || profileInfo.fullName)
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('checkUserSession error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const signOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await removeAuthInfo();
      setUser(null);
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    checkUserSession,
    isAuthenticated: !!user,
    isSigningOut,
    signOut,
    profileUpdated: user?.isProfileCompleted || false,
  }), [user, loading, isSigningOut, signOut, checkUserSession]);

  return (
    <AppAuthContext.Provider value={value}>
      {children}
    </AppAuthContext.Provider>
  );
};

// Also export as default for backward compatibility
export default AppAuthContext;