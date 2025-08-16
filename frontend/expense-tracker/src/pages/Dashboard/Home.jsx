import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
      console.log("dashboard data:", response.data);
    } catch (err) {
      console.log("Something went wrong. please try again,", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Transactions - Takes 2 columns on desktop */}
          <div className="xl:col-span-2">
            <RecentTransactions 
              transactions={dashboardData?.receentTransactions} 
              onSeeMore={() => navigate('/expense')}
            />
          </div>
          
          {/* Finance Overview - Takes 1 column on desktop */}
          <div className="xl:col-span-1">
            <FinanceOverview 
              totalBalance={dashboardData?.totalBalance || 0} 
              totalIncome={dashboardData?.totalIncome || 0} 
              totalExpense={dashboardData?.totalExpense || 0}
            />
            <ExpenseTransactions transactions={dashboardData?.last30daysExpenses?.transactions || {}} onSeeMore={navigate("/expense")}/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;