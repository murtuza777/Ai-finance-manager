import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import VirtualFinanceManager from '@/components/pages/dashboard/virtual-finance-manager';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <VirtualFinanceManager />
    </ProtectedRoute>
  );
} 