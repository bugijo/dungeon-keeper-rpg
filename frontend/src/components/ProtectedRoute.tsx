import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Layout } from './Layout';

export function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Se não há token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há token, renderiza a página solicitada com layout
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}