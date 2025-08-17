import React from "react";
import { LuUser, LuMail, LuCalendar, LuImage } from "react-icons/lu";

const ProfileOverview = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const profileData = [
    {
      label: "Username",
      value: user?.user?.userName || "N/A",
      icon: LuUser,
      description: "Your display name"
    },
    {
      label: "Email Address",
      value: user?.user?.email || "N/A",
      icon: LuMail,
      description: "Your login email"
    },
    {
      label: "Member Since",
      value: formatDate(user?.user?.createdAt),
      icon: LuCalendar,
      description: "Account creation date"
    },
    {
      label: "Profile Image",
      value: user?.user?.profileImageUrl ? "Set" : "Not set",
      icon: LuImage,
      description: "Your profile picture status"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Profile Information
        </h3>
        <p className="text-gray-600 text-sm">
          Here's an overview of your account information. Use the tabs above to make changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileData.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <item.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {item.label}
                </p>
                <p className="text-base text-gray-700 font-semibold mt-1 break-words">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Image Preview */}
      {user?.user?.profileImageUrl && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Current Profile Image
          </h4>
          <div className="flex items-center space-x-4">
            <img 
              src={user.user.profileImageUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
              <p className="text-sm text-gray-600">
                This is your current profile image. You can update it using the "Edit Profile" tab.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account Stats */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Account Activity
        </h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {Math.floor((new Date() - new Date(user?.user?.createdAt)) / (1000 * 60 * 60 * 24)) || 0}
            </p>
            <p className="text-sm text-gray-600">Days Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {user?.user?.profileImageUrl ? "✓" : "○"}
            </p>
            <p className="text-sm text-gray-600">Profile Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
