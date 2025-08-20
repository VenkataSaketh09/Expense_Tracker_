import React, { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import ProfileEditForm from "../../components/profile/ProfileEditForm";
import PasswordChangeForm from "../../components/profile/PasswordChangeForm";
import ProfileOverview from "../../components/profile/ProfileOverview";
import { LuUser, LuLock, LuEye } from "react-icons/lu";
import { useUserInfo } from "../../hooks/useQueries";
import { getUserName, getUserEmail } from "../../utils/helper";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Use React Query for user data
  const { data: user, isLoading, error } = useUserInfo();

  const tabs = [
    {
      id: "overview",
      label: "Profile Overview",
      icon: LuEye,
      description: "View your profile information",
    },
    {
      id: "edit",
      label: "Edit Profile",
      icon: LuUser,
      description: "Update your personal information",
    },
    {
      id: "password",
      label: "Change Password",
      icon: LuLock,
      description: "Update your account security",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview user={user} />;
      case "edit":
        return <ProfileEditForm user={user} />;
      case "password":
        return <PasswordChangeForm />;
      default:
        return <ProfileOverview user={user} />;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Profile">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
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
      <DashboardLayout activeMenu="Profile">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load profile data</p>
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

  const userName = getUserName(user);
  const userEmail = getUserEmail(user);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      isActive
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
