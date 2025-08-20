import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import First5Expenses from "../../components/dashboard/First5Expenses";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import IncomeSourcesChart from "../../components/dashboard/IncomeSourcesChart";
import Last5Income from "../../components/dashboard/Last5Income";
import { useDashboardData } from "../../hooks/useQueries";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  
  // Use React Query for dashboard data
  const { data: dashboardData, isLoading, error } = useDashboardData();

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load dashboard data</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-violet-700 text-white rounded-lg hover:bg-violet-800"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-violet-700"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-700"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-600"
          />
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Transactions - Takes 2 columns on desktop */}
          <div className="xl:col-span-2">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          {/* Finance Overview - Takes 1 column on desktop */}
          <div className="xl:col-span-1">
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
          </div>
        </div>

        {/* Second Row - Expenses and Last 30 Days Expenses */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <First5Expenses
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            transactions={dashboardData?.last30daysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
        </div>

        {/* Third Row - Last 60 Days Income Chart and Income Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <IncomeSourcesChart
            transactions={dashboardData?.last60daysIncome?.transactions || []}
          />
          <Last5Income
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
