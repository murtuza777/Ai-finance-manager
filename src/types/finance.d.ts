export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface FinancialData {
  netWorth: number;
  monthlyBudget: {
    spent: number;
    total: number;
  };
  investmentPerformance: number;
  expenseData: Array<{
    name: string;
    value: number;
  }>;
  cashFlowData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  investmentData: Array<{
    month: string;
    stocks: number;
    bonds: number;
    realestate: number;
  }>;
  transactions: Transaction[];
} 