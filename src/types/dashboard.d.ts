import type { LucideIcon } from 'lucide-react';
import type { FinancialData, Transaction } from './finance';
import { User } from 'firebase/auth';

export interface DashboardState {
  data: FinancialData | null;
  budgetData: Record<string, number> | null;
  goals: Array<{
    name: string;
    current: number;
    target: number;
  }> | null;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export interface QuickStatsProps {
  netWorth: number;
  monthlyBudget: {
    spent: number;
    total: number;
  };
  investmentPerformance: number;
}

export interface ExpenseBreakdownProps {
  expenseData: Array<{
    name: string;
    value: number;
  }>;
}

export interface CashFlowProjectionProps {
  cashFlowData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

export interface InvestmentPerformanceProps {
  investmentData: Array<{
    month: string;
    stocks: number;
    bonds: number;
    realestate: number;
  }>;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export interface BudgetingProps {
  budgetData: Record<string, number>;
  setBudgetData: (data: Record<string, number>) => void;
}

export interface GoalsProps {
  goals: Array<{
    name: string;
    current: number;
    target: number;
  }>;
  setGoals: (goals: Array<{
    name: string;
    current: number;
    target: number;
  }>) => void;
}

export interface AIInsightsProps {
  transactions: Transaction[];
  budgetData: Record<string, number>;
  investmentData: Array<{
    month: string;
    stocks: number;
    bonds: number;
    realestate: number;
  }>;
} 