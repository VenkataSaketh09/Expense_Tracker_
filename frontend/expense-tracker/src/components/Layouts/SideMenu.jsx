import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserInfo } from "../../hooks/useQueries";
import { usePrefetch } from "../../hooks/usePrefetch";
import { getUserName } from "../../utils/helper";
import {
  LuDollarSign,
  LuTrendingUp,
  LuUser,
  LuLogOut,
} from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";

const SideMenu = ({ activeMenu }) => {
  const location = useLocation();
  const { data: user, isLoading } = useUserInfo();
  const { prefetchDashboard, prefetchExpenses, prefetchIncome, prefetchUser } = usePrefetch();

  const userName = getUserName(user);

  const menuItems = [
    {
      path: "/dashboard",
      icon: <RiHome6Line className="w-5 h-5" />,
      label: "Dashboard",
      prefetch: prefetchDashboard,
    },
    {
      path: "/expense",
      icon: <LuDollarSign className="w-5 h-5" />,
      label: "Expenses",
      prefetch: prefetchExpenses,
    },
    {
      path: "/income",
      icon: <LuTrendingUp className="w-5 h-5" />,
      label: "Income",
      prefetch: prefetchIncome,
    },
    {
      path: "/profile",
      icon: <LuUser className="w-5 h-5" />,
      label: "Profile",
      prefetch: prefetchUser,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleMenuClick = (prefetch) => {
    if (prefetch) {
      prefetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* User Profile Section */}
      <div className="mb-8 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{userName}</p>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleMenuClick(item.prefetch)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
              }`}
            >
              <div className={`${isActive ? 'text-purple-700' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LuLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;