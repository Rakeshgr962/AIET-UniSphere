import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Role Definitions for AIET-UniSphere Role-Aware Architecture.
 */
export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

/**
 * Centralized Role Guard Component for Frontend Route Protection.
 * 
 * IMPORTANT ARCHITECTURE & SECURITY NOTICE:
 * ------------------------------------------------------------------
 * Frontend route protection prevents invalid UI navigation and delivers a role-tailored UX.
 * IT IS NOT A REAL SECURITY BOUNDARY. In client-side SPA architectures, frontend code and route
 * definitions delivered to the browser can be inspected by users.
 * 
 * Production security MUST be independently verified and enforced by the backend API:
 * 1. Authenticated Session/JWT validation
 * 2. Backend User Role & Department Scope validation
 * 3. Row-level Data Ownership and Access Control checks
 * ------------------------------------------------------------------
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const location = useLocation();

  // Retrieve current active user role from localStorage or default to current route context
  const storedRole = (localStorage.getItem('unisphere_user_role') as UserRole) || 
    (location.pathname.startsWith('/hod') ? 'HOD' : 
     location.pathname.startsWith('/faculty') ? 'FACULTY' : 'STUDENT');

  const isAuthorized = allowedRoles.includes(storedRole);

  if (!isAuthorized) {
    // Redirect unauthorized navigation to appropriate dashboard or role selection
    if (storedRole === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
    if (storedRole === 'FACULTY') return <Navigate to="/faculty/dashboard" replace />;
    if (storedRole === 'HOD') return <Navigate to="/hod/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const setSessionRole = (role: UserRole) => {
  localStorage.setItem('unisphere_user_role', role);
};

export const getSessionRole = (): UserRole => {
  return (localStorage.getItem('unisphere_user_role') as UserRole) || 'STUDENT';
};
