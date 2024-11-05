"use client"

import React, { useState, useEffect, createContext, useContext } from "react"
import { 
  Bell, ChevronDown, CreditCard, DollarSign, Home, Menu, 
  Moon, Sun, X, Wallet, Target, Calendar, Filter, 
  Download, Trash2, LogOut, UserPlus, Lock, type LucideIcon 
} from "lucide-react"
import type { 
  SidebarProps, HeaderProps, QuickStatsProps, 
  ExpenseBreakdownProps, CashFlowProjectionProps,
  InvestmentPerformanceProps, TransactionListProps,
  BudgetingProps, GoalsProps, DashboardState
} from "@/types/dashboard"
import type { FinancialData, User } from "@/types/finance"
import type { AuthContextType, AuthProviderProps } from "@/types/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  ChartTooltip
} from "@/components/ui/recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { Transaction } from "@/types/finance"
import { format } from "date-fns"
import { Tooltip } from "recharts"
import { useAuth } from '@/contexts/AuthContext'
import type { DateRange } from "react-day-picker"
import { useRouter } from 'next/router';
import { getAssetUrl } from '@/lib/utils';

// Mock API for financial data
const mockAPI = {
  fetchUserData: async (userId: number): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-avatar.jpg"
    }
  },
  fetchFinancialData: async (userId: string): Promise<FinancialData> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      netWorth: 120350,
      monthlyBudget: { spent: 3250, total: 5000 },
      investmentPerformance: 8.2,
      expenseData: [
        { name: "Housing", value: 1500 },
        { name: "Food", value: 500 },
        { name: "Transportation", value: 300 },
        { name: "Utilities", value: 200 },
        { name: "Entertainment", value: 150 },
      ],
      cashFlowData: [
        { month: "Jan", income: 5000, expenses: 4000 },
        { month: "Feb", income: 5200, expenses: 4100 },
        { month: "Mar", income: 5100, expenses: 4200 },
        { month: "Apr", income: 5300, expenses: 4000 },
        { month: "May", income: 5400, expenses: 4300 },
        { month: "Jun", income: 5500, expenses: 4100 },
      ],
      investmentData: [
        { month: "Jan", stocks: 10000, bonds: 5000, realestate: 15000 },
        { month: "Feb", stocks: 11000, bonds: 5100, realestate: 15200 },
        { month: "Mar", stocks: 10500, bonds: 5200, realestate: 15400 },
        { month: "Apr", stocks: 12000, bonds: 5150, realestate: 15600 },
        { month: "May", stocks: 12500, bonds: 5250, realestate: 15800 },
        { month: "Jun", stocks: 13000, bonds: 5300, realestate: 16000 },
      ],
      transactions: [
        { id: 1, type: 'expense', description: 'Grocery Shopping', amount: 150.75, date: '2023-06-15' },
        { id: 2, type: 'income', description: 'Salary Deposit', amount: 3500, date: '2023-06-01' },
        { id: 3, type: 'expense', description: 'Electric Bill', amount: 85.20, date: '2023-06-10' },
        { id: 4, type: 'expense', description: 'Netflix Subscription', amount: 14.99, date: '2023-06-05' },
        { id: 5, type: 'income', description: 'Freelance Payment', amount: 500, date: '2023-06-20' },
      ],
    }
  },
  updateFinancialData: async (userId: number, data: Partial<FinancialData>): Promise<{ success: boolean }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  }
}

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }: SidebarProps) => (
  <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-background transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
    <div className="flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">VFM</h1>
      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
        <X className="h-6 w-6" />
      </Button>
    </div>
    <nav className="space-y-2 p-4">
      <Button variant={activeTab === 'dashboard' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('dashboard')}>
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
      <Button variant={activeTab === 'transactions' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('transactions')}>
        <CreditCard className="mr-2 h-4 w-4" />
        Transactions
      </Button>
      <Button variant={activeTab === 'budgeting' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('budgeting')}>
        <Wallet className="mr-2 h-4 w-4" />
        Budgeting
      </Button>
      <Button variant={activeTab === 'investments' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('investments')}>
        <DollarSign className="mr-2 h-4 w-4" />
        Investments
      </Button>
      <Button variant={activeTab === 'goals' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('goals')}>
        <Target className="mr-2 h-4 w-4" />
        Goals
      </Button>
    </nav>
  </aside>
)

// Header Component
const Header = ({ setSidebarOpen, darkMode, setDarkMode }: HeaderProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Use the full path for navigation
      router.push('/Ai-finance-manager/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b">
      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={user?.email || "User"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
          </SelectContent>
        </Select>
        <Avatar>
          <AvatarImage 
            src={user?.photoURL || getAssetUrl('/placeholder-avatar.jpg')} 
            alt={user?.email || "User"} 
          />
          <AvatarFallback>{user?.email?.[0].toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2">
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

// Quick Stats Component
const QuickStats = ({ netWorth, monthlyBudget, investmentPerformance }: QuickStatsProps) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${monthlyBudget.spent.toLocaleString()} / ${monthlyBudget.total.toLocaleString()}</div>
        <Progress value={(monthlyBudget.spent / monthlyBudget.total) * 100} className="mt-2" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Investment Performance</CardTitle>
        <LineChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{investmentPerformance}%</div>
        <p className="text-xs text-muted-foreground">YTD Return</p>
      </CardContent>
    </Card>
  </div>
)

// Expense Breakdown Component
const ExpenseBreakdown = ({ expenseData }: ExpenseBreakdownProps) => (
  <Card className="col-span-2 lg:col-span-1">
    <CardHeader>
      <CardTitle>Expense Breakdown</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          housing: {
            label: "Housing",
            color: "hsl(var(--chart-1))",
          },
          food: {
            label: "Food",
            color: "hsl(var(--chart-2))",
          },
          transportation: {
            label: "Transportation",
            color: "hsl(var(--chart-3))",
          },
          utilities: {
            label: "Utilities",
            color: "hsl(var(--chart-4))",
          },
          entertainment: {
            label: "Entertainment",
            color: "hsl(var(--chart-5))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              
              fill="#8884d8"
              label
            />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)

// Cash Flow Projection Component
const CashFlowProjection = ({ cashFlowData }: CashFlowProjectionProps) => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Cash Flow Projection</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          income: {
            label: "Income",
            color: "hsl(var(--chart-1))",
          },
          expenses: {
            label: "Expenses",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cashFlowData}>
            <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)

// Investment Performance Component
const InvestmentPerformance = ({ investmentData }: InvestmentPerformanceProps) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Investment Performance</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          stocks: {
            label: "Stocks",
            color: "hsl(var(--chart-1))",
          },
          bonds: {
            label: "Bonds",
            color: "hsl(var(--chart-2))",
          },
          realestate: {
            label: "Real Estate",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investmentData}>
            <Bar dataKey="stocks" fill="var(--color-stocks)" />
            <Bar dataKey="bonds" fill="var(--color-bonds)" />
            <Bar dataKey="realestate" fill="var(--color-realestate)" />
            <Tooltip content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)

// AI Insights Component
interface AIInsightsProps {
  transactions: Transaction[];
  budgetData: Record<string, number>;
  investmentData: Array<{
    month: string;
    stocks: number;
    bonds: number;
    realestate: number;
  }>;
}

const AIInsights = ({ transactions, budgetData, investmentData }: AIInsightsProps) => {
  const generateInsights = () => {
    const insights: Array<{title: string; description: string}> = [];

    // Spending pattern insight
    const totalSpent = transactions
      .filter((t: Transaction) => t.type === 'expense')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const biggestExpenseCategory = Object.entries(budgetData)
      .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    insights.push({
      title: "Spending Pattern Analysis",
      description: `Your biggest expense category is ${biggestExpenseCategory}. Consider reviewing your ${biggestExpenseCategory.toLowerCase()} expenses to identify potential savings.`
    });

    // Investment diversification insight
    const latestInvestmentData = investmentData[investmentData.length - 1];
    const totalInvestment = latestInvestmentData.stocks + latestInvestmentData.bonds + latestInvestmentData.realestate;
    const stockPercentage = (latestInvestmentData.stocks / totalInvestment) * 100;
    
    if (stockPercentage > 70) {
      insights.push({
        title: "Investment Diversification",
        description: "Your portfolio is heavily weighted towards stocks. Consider diversifying to reduce risk."
      });
    }

    // Savings opportunity insight
    const incomeThisMonth = transactions
      .filter((t: Transaction) => t.type === 'income')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    
    const savingsRate = ((incomeThisMonth - totalSpent) / incomeThisMonth) * 100;
    
    if (savingsRate < 20) {
      insights.push({
        title: "Savings Opportunity",
        description: "Your current savings rate is below 20%. Try to increase your savings to build a stronger financial foundation."
      });
    }

    // Predictive analysis
    const lastThreeMonths = investmentData.slice(-3);
    const averageGrowth = lastThreeMonths.reduce((sum: number, month: any, index: number, array: any[]) => {
      if (index === 0) return sum;
      const prevMonth = array[index - 1];
      const growth = (month.stocks + month.bonds + month.realestate) / 
        (prevMonth.stocks + prevMonth.bonds + prevMonth.realestate) - 1;
      return sum + growth;
    }, 0) / 2;

    insights.push({
      title: "Investment Growth Prediction",
      description: `Based on your recent performance, we predict your investments could grow by approximately ${(averageGrowth * 100).toFixed(2)}% next month.`
    });

    return insights;
  };

  const insights = generateInsights();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>Personalized financial advice based on your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <LineChart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <p className="text-xs text-muted-foreground italic">
          I am AI; please consult a financial expert before making significant financial decisions.
        </p>
      </CardContent>
    </Card>
  )
}

// Transaction List Component
const TransactionList = ({ transactions, setTransactions }: TransactionListProps) => {
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const filteredTransactions = transactions.filter(transaction => 
    (filter === 'all' || transaction.type === filter) &&
    (!dateRange?.from || new Date(transaction.date) >= dateRange.from) &&
    (!dateRange?.to || new Date(transaction.date) <= dateRange.to)
  )

  const handleDeleteTransaction = (id: number) => {
    const newTransactions = transactions.filter(t => t.id !== id)
    setTransactions(newTransactions)
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed from your list.",
    })
  }

  const handleExport = () => {
    const csv = [
      ["Description", "Date", "Amount", "Type"],
      ...filteredTransactions.map(t => [t.description, t.date, t.amount, t.type])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "transactions.csv")
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleTransactionUpdate = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Budgeting Component
const Budgeting = ({ budgetData, setBudgetData }: BudgetingProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Budget Allocation</CardTitle>
    </CardHeader>
    <CardContent>
      {Object.entries(budgetData).map(([category, amount]) => (
        <div key={category} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={category}>{category}</Label>
            <span>${amount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="range"
              id={category}
              min="0"
              max="2000"
              value={amount}
              onChange={(e) => setBudgetData({...budgetData, [category]: parseInt(e.target.value)})}
              className="w-full"
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setBudgetData({...budgetData, [category]: parseInt(e.target.value)})}
              className="w-20"
            />
          </div>
        </div>
      ))}
      <div className="mt-4">
        <strong>Total Budget: ${Object.values(budgetData).reduce((a, b) => a + b, 0)}</strong>
      </div>
    </CardContent>
  </Card>
)

// Goals Component
const Goals = ({ goals, setGoals }: GoalsProps) => {
  const [newGoal, setNewGoal] = useState({ name: '', current: 0, target: 0 })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target > 0) {
      setGoals([...goals, newGoal])
      setNewGoal({ name: '', current: 0, target: 0 })
      toast({
        title: "New goal added",
        description: `Your goal "${newGoal.name}" has been added successfully.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <Label>{goal.name}</Label>
              <span>${goal.current} / ${goal.target}</span>
            </div>
            <Progress value={(goal.current / goal.target) * 100} className="w-full" />
          </div>
        ))}
        <Separator className="my-4" />
        <div className="space-y-4">
          <Input
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
          />
          <Input
            type="number"
            placeholder="Target Amount"
            value={newGoal.target}
            onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value)})}
          />
          <Button onClick={handleAddGoal}>Add New Goal</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [state, setState] = useState<DashboardState>({
    data: null,
    budgetData: null,
    goals: null
  })

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const financialData = await mockAPI.fetchFinancialData(user.uid)
        setState({
          data: financialData,
          budgetData: financialData.expenseData.reduce((acc, item) => ({
            ...acc, 
            [item.name]: item.value
          }), {}),
          goals: [
            { name: 'Emergency Fund', current: 5000, target: 10000 },
            { name: 'Vacation Savings', current: 2000, target: 5000 },
            { name: 'New Car', current: 10000, target: 30000 },
          ]
        })
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleBudgetDataUpdate = (newBudgetData: Record<string, number>) => {
    setState(prev => ({
      ...prev,
      budgetData: newBudgetData
    }))
  }

  const handleGoalsUpdate = (newGoals: Array<{ name: string; current: number; target: number }>) => {
    setState(prev => ({
      ...prev,
      goals: newGoals
    }))
  }

  const handleTransactionUpdate = (newTransactions: Transaction[]) => {
    setState(prev => ({
      ...prev,
      data: prev.data ? {
        ...prev.data,
        transactions: newTransactions
      } : null
    }));
  };

  if (!state.data || !state.budgetData || !state.goals) {
    return <div>Loading...</div>
  }

  return (
    <div className={`flex h-screen bg-background ${darkMode ? 'dark' : ''}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <>
              <QuickStats
                netWorth={state.data.netWorth}
                monthlyBudget={state.data.monthlyBudget}
                investmentPerformance={state.data.investmentPerformance}
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <ExpenseBreakdown expenseData={state.data.expenseData} />
                <CashFlowProjection cashFlowData={state.data.cashFlowData} />
              </div>
              <InvestmentPerformance investmentData={state.data.investmentData} />
              <AIInsights 
                transactions={state.data.transactions}
                budgetData={state.budgetData}
                investmentData={state.data.investmentData}
              />
              <TransactionList 
                transactions={state.data.transactions}
                setTransactions={handleTransactionUpdate}
              />
            </>
          )}
          {activeTab === 'transactions' && (
            <TransactionList 
              transactions={state.data.transactions}
              setTransactions={handleTransactionUpdate}
            />
          )}
          {activeTab === 'budgeting' && (
            <Budgeting budgetData={state.budgetData} setBudgetData={handleBudgetDataUpdate} />
          )}
          {activeTab === 'investments' && (
            <InvestmentPerformance investmentData={state.data.investmentData} />
          )}
          {activeTab === 'goals' && (
            <Goals goals={state.goals} setGoals={handleGoalsUpdate} />
          )}
        </main>
      </div>
    </div>
  )
}

// Main App Component
export default function VirtualFinanceManager() {
  return (
    <Dashboard />
  )
}

// Add this custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex flex-col">
            <span className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}
            </span>
            <span className="text-sm font-bold">
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};